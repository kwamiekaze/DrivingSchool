'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Calendar, Clock, MapPin, MessageSquare, FileText, CreditCard, BarChart3 } from 'lucide-react'

export default function StudentPortalPage() {
  const mockStudent = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    packageName: 'Full Course',
    hoursRemaining: 4,
    totalHours: 6,
  }

  const mockUpcomingLessons = [
    {
      id: '1',
      date: '2025-08-15',
      time: '9:00 AM - 10:00 AM',
      instructor: 'Mike Johnson',
      vehicle: 'Honda Civic (ABC-123)',
      pickupAddress: '123 Main St, Carrollton, GA 30117',
      status: 'confirmed',
      eta: '9:00 AM',
    },
    {
      id: '2',
      date: '2025-08-17',
      time: '2:00 PM - 3:00 PM',
      instructor: 'Lisa Chen',
      vehicle: 'Toyota Corolla (XYZ-789)',
      pickupAddress: '123 Main St, Carrollton, GA 30117',
      status: 'confirmed',
      eta: '2:00 PM',
    },
  ]

  const mockProgress = [
    { skill: 'Parallel Parking', rating: 4, maxRating: 5 },
    { skill: 'Highway Merging', rating: 3, maxRating: 5 },
    { skill: 'Three-Point Turn', rating: 5, maxRating: 5 },
    { skill: 'Backing Up', rating: 4, maxRating: 5 },
    { skill: 'Lane Changes', rating: 3, maxRating: 5 },
  ]

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
            <span className="text-sm text-gray-600">Welcome, {mockStudent.firstName}</span>
            <Button variant="ghost">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Student Portal</h1>
          <p className="text-gray-600">Track your progress and manage your lessons</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Calendar className="h-5 w-5" />
                  <span>Upcoming Lessons</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockUpcomingLessons.map((lesson) => (
                    <div key={lesson.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{lesson.date}</h3>
                          <p className="text-gray-600">{lesson.time}</p>
                        </div>
                        <Badge variant={lesson.status === 'confirmed' ? 'default' : 'secondary'}>
                          {lesson.status}
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Instructor</p>
                          <p className="text-gray-600">{lesson.instructor}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Vehicle</p>
                          <p className="text-gray-600">{lesson.vehicle}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="font-medium text-gray-700 flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>Pickup Location</span>
                          </p>
                          <p className="text-gray-600">{lesson.pickupAddress}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="font-medium text-gray-700 flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>Estimated Arrival</span>
                          </p>
                          <p className="text-gray-600">{lesson.eta}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 mt-4">
                        <Button size="sm" variant="outline">
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline">
                          Cancel
                        </Button>
                        <Button size="sm" variant="outline">
                          Message Instructor
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-[#0E7C86] hover:bg-[#0E7C86]/90">
                    Book Additional Lesson
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <BarChart3 className="h-5 w-5" />
                  <span>Driving Skills Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProgress.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(skill.maxRating)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-3 h-3 rounded-full ${
                                i < skill.rating ? 'bg-[#0E7C86]' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {skill.rating}/{skill.maxRating}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Next Focus Areas</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Practice highway merging in light traffic</li>
                    <li>• Work on smooth lane changes with proper signaling</li>
                    <li>• Review parking techniques for road test preparation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#0E7C86]">Package Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">{mockStudent.packageName}</h3>
                    <p className="text-sm text-gray-600">
                      {mockStudent.hoursRemaining} of {mockStudent.totalHours} hours remaining
                    </p>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#0E7C86] h-2 rounded-full" 
                      style={{ 
                        width: `${((mockStudent.totalHours - mockStudent.hoursRemaining) / mockStudent.totalHours) * 100}%` 
                      }}
                    />
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    {mockStudent.totalHours - mockStudent.hoursRemaining} hours completed
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0E7C86]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/portal/schedule">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Lesson
                    </Button>
                  </Link>
                  
                  <Link href="/portal/messages">
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Messages
                    </Button>
                  </Link>
                  
                  <Link href="/portal/documents">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="h-4 w-4 mr-2" />
                      Documents
                    </Button>
                  </Link>
                  
                  <Link href="/portal/billing">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing & Receipts
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0E7C86]">Contact Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Email:</span>
                    <p className="text-gray-600">{mockStudent.email}</p>
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span>
                    <p className="text-gray-600">{mockStudent.phone}</p>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Update Contact Info
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#0E7C86]">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Have questions about your lessons or need to make changes?
                  </p>
                  
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      Call (770) 555-0123
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      Send Message
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      View FAQs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
