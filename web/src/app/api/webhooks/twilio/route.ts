import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { headers } from 'next/headers'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    
    const twilioSignature = headersList.get('x-twilio-signature')
    if (process.env.TWILIO_AUTH_TOKEN && twilioSignature) {
      const expectedSignature = crypto
        .createHmac('sha1', process.env.TWILIO_AUTH_TOKEN)
        .update(request.url + body)
        .digest('base64')
      
      if (twilioSignature !== expectedSignature) {
        console.error('Invalid Twilio webhook signature')
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
      }
    }

    const params = new URLSearchParams(body)
    const messageStatus = params.get('MessageStatus')
    const messageSid = params.get('MessageSid')
    const to = params.get('To')
    const from = params.get('From')
    const messageBody = params.get('Body')

    console.log('Twilio webhook received:', {
      messageStatus,
      messageSid,
      to,
      from,
      body: messageBody
    })

    if (messageBody && from && to) {
      const normalizedFrom = from.replace(/^\+1/, '').replace(/\D/g, '')
      
      const student = await db.student.findFirst({
        where: {
          phone: {
            contains: normalizedFrom
          }
        },
        include: {
          organization: true
        }
      })

      if (student) {
        const reply = messageBody.toLowerCase().trim()
        
        if (reply === 'y' || reply === 'yes' || reply === 'confirm') {
          await db.message.create({
            data: {
              organizationId: student.organizationId,
              studentId: student.id,
              type: 'CUSTOM',
              channel: 'SMS',
              recipient: student.phone || '',
              content: messageBody,
              status: 'DELIVERED',
              variables: {
                twilioSid: messageSid,
                twilioStatus: messageStatus,
                confirmed: true
              }
            }
          })
        } else if (reply === 'r' || reply === 'reschedule') {
          await db.message.create({
            data: {
              organizationId: student.organizationId,
              studentId: student.id,
              type: 'CUSTOM',
              channel: 'SMS',
              recipient: student.phone || '',
              content: messageBody,
              status: 'DELIVERED',
              variables: {
                twilioSid: messageSid,
                twilioStatus: messageStatus,
                rescheduleRequest: true
              }
            }
          })
        } else {
          await db.message.create({
            data: {
              organizationId: student.organizationId,
              studentId: student.id,
              type: 'CUSTOM',
              channel: 'SMS',
              recipient: student.phone || '',
              content: messageBody,
              status: 'DELIVERED',
              variables: {
                twilioSid: messageSid,
                twilioStatus: messageStatus
              }
            }
          })
        }
      }
    }

    if (messageSid && messageStatus) {
      await db.message.updateMany({
        where: {
          variables: {
            path: ['twilioSid'],
            equals: messageSid
          }
        },
        data: {
          status: messageStatus === 'delivered' ? 'DELIVERED' : 
                 messageStatus === 'failed' ? 'FAILED' : 'SENT',
          variables: {
            twilioStatus: messageStatus
          }
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Twilio webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
