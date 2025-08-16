'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

const packages = [
  {
    id: 'starter',
    name: 'Starter Drive',
    hours: 2,
    price: 140,
    description: 'Perfect for beginners. Learn the basics with our expert instructors.',
    features: ['2 hours of instruction', 'Basic driving skills', 'Safety fundamentals']
  },
  {
    id: 'road-test',
    name: 'Road Test Prep',
    hours: 4,
    price: 260,
    description: 'Get ready for your road test with focused preparation.',
    features: ['4 hours of instruction', 'Road test techniques', 'Confidence building', 'Test route practice']
  },
  {
    id: 'full-course',
    name: 'Full Course',
    hours: 6,
    price: 360,
    description: 'Complete driving education from beginner to road test ready.',
    features: ['6 hours of instruction', 'Comprehensive curriculum', 'Road test preparation', 'Ongoing support'],
    popular: true
  }
]

export default function EnrollPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>('')
  const [addPickupDropoff, setAddPickupDropoff] = useState(false)
  const [formData, setFormData] = useState({
    studentFirstName: '',
    studentLastName: '',
    studentEmail: '',
    studentPhone: '',
    parentFirstName: '',
    parentLastName: '',
    parentEmail: '',
    parentPhone: '',
    pickupAddress: '',
    dropoffAddress: '',
    preferredTimes: '',
    specialRequests: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateTotal = () => {
    const pkg = packages.find(p => p.id === selectedPackage)
    const packagePrice = pkg?.price || 0
    const pickupFee = addPickupDropoff ? 20 : 0
    return packagePrice + pickupFee
  }

  const handleEnroll = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: selectedPackage,
          addPickupDropoff,
          studentData: formData,
          organizationId: 'default-org',
        }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Failed to create checkout session:', data.error)
      }
    } catch (error) {
      console.error('Enrollment error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-[#0E7C86]">
              Driving School
            </div>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            Choose Your Driving Package
          </h1>
          <p className="text-lg text-gray-600">
            Select the package that best fits your learning goals and schedule.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`cursor-pointer transition-all ${
                selectedPackage === pkg.id 
                  ? 'ring-2 ring-[#0E7C86] border-[#0E7C86]' 
                  : 'hover:shadow-lg'
              } ${pkg.popular ? 'relative' : ''}`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FF914D] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-[#0E7C86]">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#0F172A] mb-4">
                  ${pkg.price}
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-[#0E7C86] rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedPackage && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Add-On Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="pickup-dropoff"
                  checked={addPickupDropoff}
                  onChange={(e) => setAddPickupDropoff(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="pickup-dropoff">
                  Pick-up/Drop-off Service (+$20 per lesson)
                </Label>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                We&apos;ll pick you up and drop you off at your preferred location for each lesson.
              </p>
            </CardContent>
          </Card>
        )}

        {selectedPackage && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="student-first-name">Student First Name</Label>
                  <Input
                    id="student-first-name"
                    value={formData.studentFirstName}
                    onChange={(e) => handleInputChange('studentFirstName', e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="student-last-name">Student Last Name</Label>
                  <Input
                    id="student-last-name"
                    value={formData.studentLastName}
                    onChange={(e) => handleInputChange('studentLastName', e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="student-email">Student Email</Label>
                  <Input
                    id="student-email"
                    type="email"
                    value={formData.studentEmail}
                    onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                    placeholder="student@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="student-phone">Student Phone</Label>
                  <Input
                    id="student-phone"
                    type="tel"
                    value={formData.studentPhone}
                    onChange={(e) => handleInputChange('studentPhone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Parent/Guardian Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="parent-first-name">Parent First Name</Label>
                    <Input
                      id="parent-first-name"
                      value={formData.parentFirstName}
                      onChange={(e) => handleInputChange('parentFirstName', e.target.value)}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parent-last-name">Parent Last Name</Label>
                    <Input
                      id="parent-last-name"
                      value={formData.parentLastName}
                      onChange={(e) => handleInputChange('parentLastName', e.target.value)}
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="parent-email">Parent Email</Label>
                    <Input
                      id="parent-email"
                      type="email"
                      value={formData.parentEmail}
                      onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                      placeholder="parent@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="parent-phone">Parent Phone</Label>
                    <Input
                      id="parent-phone"
                      type="tel"
                      value={formData.parentPhone}
                      onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {addPickupDropoff && (
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Pickup & Dropoff Locations</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pickup-address">Pickup Address</Label>
                      <Input
                        id="pickup-address"
                        value={formData.pickupAddress}
                        onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                        placeholder="123 Main St, Atlanta, GA 30309"
                      />
                    </div>
                    <div>
                      <Label htmlFor="dropoff-address">Dropoff Address (optional)</Label>
                      <Input
                        id="dropoff-address"
                        value={formData.dropoffAddress}
                        onChange={(e) => handleInputChange('dropoffAddress', e.target.value)}
                        placeholder="456 Oak Ave, Atlanta, GA 30309"
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Leave blank to use pickup address for dropoff
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="preferred-times">Preferred Lesson Times</Label>
                <Textarea
                  id="preferred-times"
                  value={formData.preferredTimes}
                  onChange={(e) => handleInputChange('preferredTimes', e.target.value)}
                  placeholder="e.g., Weekday afternoons, Saturday mornings, etc."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="special-requests">Special Requests or Notes</Label>
                <Textarea
                  id="special-requests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Any special accommodations or requests..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {selectedPackage && (
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{packages.find(p => p.id === selectedPackage)?.name}</span>
                  <span>${packages.find(p => p.id === selectedPackage)?.price}</span>
                </div>
                {addPickupDropoff && (
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Pick-up/Drop-off Service</span>
                    <span>+$20 per lesson</span>
                  </div>
                )}
                <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6 bg-[#0E7C86] hover:bg-[#0E7C86]/90"
                onClick={handleEnroll}
                disabled={!formData.studentFirstName || !formData.studentLastName || !formData.studentEmail}
              >
                Proceed to Payment
              </Button>
              
              <p className="text-xs text-gray-600 text-center mt-4">
                By proceeding, you agree to our terms of service and privacy policy.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
