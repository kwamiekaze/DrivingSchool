interface MessageTemplate {
  id: string
  name: string
  subject?: string
  body: string
  type: 'sms' | 'email'
  variables: string[]
}

export const messageTemplates: MessageTemplate[] = [
  {
    id: 'enrollment-confirmation',
    name: 'Enrollment Confirmation',
    subject: 'Welcome to All N 1 Driving School!',
    body: 'Hi {firstName}, welcome to All N 1 Driving School! Your {packageName} is confirmed. You\'ll get a reminder 24 hours before each lesson. View or reschedule anytime: {portalLink} — Thanks!',
    type: 'email',
    variables: ['firstName', 'packageName', 'portalLink'],
  },
  {
    id: 'reminder-24h',
    name: '24 Hour Reminder',
    body: 'Reminder: {lessonDate} {lessonTime}. Pickup at {pickupAddress}. Reply Y to confirm or R for reschedule options.',
    type: 'sms',
    variables: ['lessonDate', 'lessonTime', 'pickupAddress'],
  },
  {
    id: 'running-late',
    name: 'Running Late Cascade',
    body: 'Hey {firstName}, this is your instructor from All N 1 Driving School. Due to traffic from the previous session, your new ETA is {etaTime}. Sorry for the inconvenience—please reply to confirm you got this.',
    type: 'sms',
    variables: ['firstName', 'etaTime'],
  },
  {
    id: 'no-show',
    name: 'No Show',
    subject: 'Missed Lesson - All N 1 Driving School',
    body: 'Hi {firstName}, we waited at {pickupAddress}. Marked as no-show at {time}. Per policy, a fee may apply. Need help rebooking? {portalLink}',
    type: 'email',
    variables: ['firstName', 'pickupAddress', 'time', 'portalLink'],
  },
  {
    id: 'completion-progress',
    name: 'Lesson Completion',
    subject: 'Great Progress Today!',
    body: 'Great work today! Skills improved: {skillsList}. Next step: {nextStep}. See full progress: {portalLink}',
    type: 'email',
    variables: ['skillsList', 'nextStep', 'portalLink'],
  },
]

export function renderTemplate(template: MessageTemplate, variables: Record<string, string>) {
  let renderedBody = template.body
  let renderedSubject = template.subject || ''

  template.variables.forEach(variable => {
    const value = variables[variable] || `{${variable}}`
    renderedBody = renderedBody.replace(new RegExp(`{${variable}}`, 'g'), value)
    if (renderedSubject) {
      renderedSubject = renderedSubject.replace(new RegExp(`{${variable}}`, 'g'), value)
    }
  })

  return {
    subject: renderedSubject,
    body: renderedBody,
  }
}

export async function sendSMS(to: string, message: string) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.log('Mock SMS sent to:', to, 'Message:', message)
    return { success: true, messageId: `mock_sms_${Date.now()}` }
  }

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(
            `${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`
          ).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: to,
          From: process.env.TWILIO_PHONE_NUMBER!,
          Body: message,
        }),
      }
    )

    const data = await response.json()
    return { success: true, messageId: data.sid }
  } catch (error) {
    console.error('SMS sending error:', error)
    throw error
  }
}

export async function sendEmail(to: string, subject: string, html: string) {
  if (!process.env.SENDGRID_API_KEY) {
    console.log('Mock email sent to:', to, 'Subject:', subject)
    return { success: true, messageId: `mock_email_${Date.now()}` }
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: process.env.SENDGRID_FROM_EMAIL },
        subject,
        content: [{ type: 'text/html', value: html }],
      }),
    })

    if (!response.ok) {
      throw new Error(`SendGrid API error: ${response.status}`)
    }

    return { success: true, messageId: response.headers.get('x-message-id') }
  } catch (error) {
    console.error('Email sending error:', error)
    throw error
  }
}

export function isQuietHours(date: Date = new Date()) {
  const hour = date.getHours()
  return hour >= 20 || hour < 8
}

export function shouldSendMessage(type: 'urgent' | 'normal', date: Date = new Date()) {
  if (type === 'urgent') {
    return true
  }
  return !isQuietHours(date)
}
