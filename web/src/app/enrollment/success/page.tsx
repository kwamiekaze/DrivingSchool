'use client'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

function EnrollmentSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-[#0E7C86]">
              Driving School
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-4xl font-bold text-[#0F172A] mb-4">
            Enrollment Successful!
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Welcome to Driving School! Your payment has been processed and your enrollment is confirmed.
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">What&apos;s Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-left">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#0E7C86] text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold">Check Your Email</p>
                  <p className="text-gray-600">You&apos;ll receive a confirmation email with your enrollment details and next steps.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#0E7C86] text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold">Schedule Your Lessons</p>
                  <p className="text-gray-600">Access your student portal to book your first lesson at a time that works for you.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-[#0E7C86] text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold">Get Ready to Drive</p>
                  <p className="text-gray-600">Your instructor will contact you 24 hours before your first lesson with pickup details.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-[#0E7C86] hover:bg-[#0E7C86]/90 w-full sm:w-auto">
                Access Student Portal
              </Button>
            </Link>
            
            <div className="text-sm text-gray-500">
              Session ID: {sessionId}
            </div>
          </div>

          <div className="mt-12 p-6 bg-[#0E7C86]/5 rounded-lg">
            <h3 className="font-semibold text-[#0E7C86] mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Our team is here to support you throughout your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline">Contact Support</Button>
              </Link>
              <Link href="/faq">
                <Button variant="outline">View FAQs</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function EnrollmentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EnrollmentSuccessContent />
    </Suspense>
  )
}
