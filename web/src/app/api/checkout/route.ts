import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { db } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      packageId,
      addPickupDropoff,
      studentData,
      organizationId = 'default-org'
    } = body

    const pkg = await db.package.findUnique({
      where: { id: packageId }
    })

    if (!pkg) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    const student = await db.student.create({
      data: {
        organizationId,
        email: studentData.studentEmail,
        firstName: studentData.studentFirstName,
        lastName: studentData.studentLastName,
        phone: studentData.studentPhone,
        parentEmail: studentData.parentEmail,
        parentPhone: studentData.parentPhone,
        preferredTimes: studentData.preferredTimes ? JSON.parse(JSON.stringify({ times: studentData.preferredTimes })) : null,
      }
    })

    if (studentData.pickupAddress) {
      const pickupAddress = await db.address.create({
        data: {
          organizationId,
          street: studentData.pickupAddress,
          city: 'Atlanta',
          state: 'GA',
          zipCode: '30309',
          country: 'US',
        }
      })

      await db.student.update({
        where: { id: student.id },
        data: { pickupAddressId: pickupAddress.id }
      })
    }

    const session = await createCheckoutSession({
      packageId: pkg.id,
      packageName: pkg.name,
      packagePrice: pkg.price,
      addPickupDropoff,
      studentData: { ...studentData, studentId: student.id },
      organizationId,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
