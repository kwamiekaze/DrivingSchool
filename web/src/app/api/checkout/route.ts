import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      packageId,
      addPickupDropoff,
      studentData,
      organizationId = 'default-org'
    } = body

    const packages = [
      { id: 'starter', name: 'Starter Drive', price: 140 },
      { id: 'road-test', name: 'Road Test Prep', price: 260 },
      { id: 'full-course', name: 'Full Course', price: 360 },
    ]

    const pkg = packages.find(p => p.id === packageId)

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    console.log('Creating checkout session for:', { packageId, studentData })

    const session = await createCheckoutSession({
      packageId: pkg.id,
      packageName: pkg.name,
      packagePrice: pkg.price,
      addPickupDropoff,
      studentData: { ...studentData, studentId: 'temp-student-id' },
      organizationId,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
