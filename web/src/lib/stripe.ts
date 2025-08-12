import Stripe from 'stripe'

const isTestMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_51234567890')

export const stripe = isTestMode ? null : new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-07-30.basil',
})

export const createCheckoutSession = async ({
  packageId,
  packageName,
  packagePrice,
  addPickupDropoff,
  studentData,
  organizationId,
}: {
  packageId: string
  packageName: string
  packagePrice: number
  addPickupDropoff: boolean
  studentData: any
  organizationId: string
}) => {
  if (isTestMode) {
    return {
      id: 'cs_test_mock_session_id',
      url: `${process.env.NEXT_PUBLIC_APP_URL}/enrollment/success?session_id=cs_test_mock_session_id`,
      payment_status: 'paid',
      amount_total: (packagePrice + (addPickupDropoff ? 20 : 0)) * 100,
      metadata: {
        organizationId,
        packageId,
        studentId: studentData.studentId || '',
        addPickupDropoff: addPickupDropoff.toString(),
        preferredTimes: studentData.preferredTimes || '',
        specialRequests: studentData.specialRequests || '',
      },
    }
  }

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: packageName,
          description: `Driving instruction package`,
        },
        unit_amount: packagePrice * 100,
      },
      quantity: 1,
    },
  ]

  if (addPickupDropoff) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Pick-up/Drop-off Service',
          description: 'Convenient pickup and dropoff for each lesson',
        },
        unit_amount: 20 * 100,
      },
      quantity: 1,
    })
  }

  const session = await stripe!.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/enrollment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/enroll`,
    customer_email: studentData.studentEmail,
    metadata: {
      organizationId,
      packageId,
      studentId: studentData.studentId || '',
      addPickupDropoff: addPickupDropoff.toString(),
      preferredTimes: studentData.preferredTimes || '',
      specialRequests: studentData.specialRequests || '',
    },
  })

  return session
}
