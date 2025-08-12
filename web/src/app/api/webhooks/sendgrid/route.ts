import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    
    const sendgridSignature = headersList.get('x-twilio-email-event-webhook-signature')
    const sendgridTimestamp = headersList.get('x-twilio-email-event-webhook-timestamp')
    
    if (process.env.SENDGRID_WEBHOOK_KEY && sendgridSignature && sendgridTimestamp) {
      const payload = sendgridTimestamp + body
      const expectedSignature = crypto
        .createHmac('sha256', process.env.SENDGRID_WEBHOOK_KEY)
        .update(payload, 'utf8')
        .digest('base64')
      
      if (sendgridSignature !== expectedSignature) {
        console.error('Invalid SendGrid webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const events = JSON.parse(body)
    
    for (const event of events) {
      console.log('SendGrid webhook event:', event)
      
      const { event: eventType, sg_message_id, email, timestamp } = event
      
      if (sg_message_id) {
        let status: 'SENT' | 'DELIVERED' | 'FAILED' = 'SENT'
        if (eventType === 'delivered') status = 'DELIVERED'
        else if (eventType === 'bounce' || eventType === 'dropped') status = 'FAILED'
        else if (eventType === 'open') status = 'DELIVERED' // Keep as delivered but track opens
        else if (eventType === 'click') status = 'DELIVERED' // Keep as delivered but track clicks
        
        await db.message.updateMany({
          where: {
            variables: {
              path: ['sendgridMessageId'],
              equals: sg_message_id
            }
          },
          data: {
            status,
            variables: {
              sendgridEvent: eventType,
              timestamp: new Date(timestamp * 1000).toISOString()
            }
          }
        })
      }
      
      if (eventType === 'bounce' || eventType === 'unsubscribe') {
        const student = await db.student.findFirst({
          where: {
            email: email
          }
        })
        
        if (student) {
          await db.auditLog.create({
            data: {
              organizationId: student.organizationId,
              userId: 'system',
              action: 'EMAIL_OPT_OUT',
              resourceType: 'Student',
              resourceId: student.id,
              newValues: {
                eventType,
                email,
                timestamp: new Date().toISOString()
              }
            }
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('SendGrid webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
