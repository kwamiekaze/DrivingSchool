'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Calendar, Clock, MapPin, User, Car, ChevronLeft, ChevronRight } from 'lucide-react'
import { trpc } from '@/lib/trpc'

const mockLessons = [
  {
    id: '1',
    studentName: 'John Smith',
    packageType: 'Full Course',
    startTime: '9:00 AM',
    endTime: '10:00 AM',
    instructor: 'Mike Johnson',
    vehicle: 'Honda Civic (ABC-123)',
    zone: 'West/SW',
    pickupAddress: '123 Main St, Carrollton, GA',
    dropoffAddress: '456 Oak Ave, Carrollton, GA',
    status: 'confirmed',
    etaMinutes: 15,
  },
  {
    id: '2',
    studentName: 'Sarah Johnson',
    packageType: 'Road Test Prep',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    instructor: 'Lisa Chen',
    vehicle: 'Toyota Corolla (XYZ-789)',
    zone: 'South',
    pickupAddress: '789 Pine St, College Park, GA',
    dropoffAddress: '321 Elm St, College Park, GA',
    status: 'confirmed',
    etaMinutes: 20,
  },
  {
    id: '3',
    studentName: 'David Brown',
    packageType: 'Starter Drive',
    startTime: '2:00 PM',
    endTime: '3:00 PM',
    instructor: 'Mike Johnson',
    vehicle: 'Honda Civic (ABC-123)',
    zone: 'West/SW',
    pickupAddress: '555 Maple Dr, Douglasville, GA',
    dropoffAddress: '777 Cedar Ln, Douglasville, GA',
    status: 'confirmed',
    etaMinutes: 25,
  },
]

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null)
  
  const { data: lessons = mockLessons, isLoading } = trpc.lessons.getByDate.useQuery({
    date: selectedDate.toISOString().split('T')[0],
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'West/SW': return 'bg-blue-100 text-blue-800'
      case 'South': return 'bg-purple-100 text-purple-800'
      case 'East/SE': return 'bg-green-100 text-green-800'
      case 'North/NW': return 'bg-orange-100 text-orange-800'
      case 'Intown': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                ← Back to Dashboard
              </Button>
            </Link>
            <div className="text-2xl font-bold text-[#0E7C86]">
              Schedule Board
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Add Lesson
            </Button>
            <Button variant="ghost" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() - 1)
                setSelectedDate(newDate)
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold text-[#0F172A]">
              {formatDate(selectedDate)}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const newDate = new Date(selectedDate)
                newDate.setDate(newDate.getDate() + 1)
                setSelectedDate(newDate)
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Week View
            </Button>
            <Button variant="outline" size="sm">
              Month View
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Loading lessons...</div>
            </div>
          ) : lessons.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-500">No lessons scheduled for this date</div>
            </div>
          ) : (
            lessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedLesson === lesson.id ? 'ring-2 ring-[#0E7C86]' : ''
              }`}
              onClick={() => setSelectedLesson(selectedLesson === lesson.id ? null : lesson.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="font-semibold">
                          {typeof lesson.startTime === 'string' 
                            ? lesson.startTime 
                            : new Date(lesson.startTime).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit',
                                hour12: true 
                              })
                          } - {typeof lesson.endTime === 'string' 
                            ? lesson.endTime 
                            : new Date(lesson.endTime).toLocaleTimeString('en-US', { 
                                hour: 'numeric', 
                                minute: '2-digit',
                                hour12: true 
                              })
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {'studentName' in lesson 
                            ? lesson.studentName 
                            : `${lesson.student?.firstName} ${lesson.student?.lastName}`
                          }
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col">
                      <Badge variant="secondary" className="mb-1">
                        {'packageType' in lesson 
                          ? lesson.packageType 
                          : lesson.order?.package?.name || 'Unknown Package'
                        }
                      </Badge>
                      <Badge className={getZoneColor('zone' in lesson ? lesson.zone : lesson.pickupAddress?.zone?.name || 'Unknown')}>
                        {'zone' in lesson ? lesson.zone : lesson.pickupAddress?.zone?.name || 'Unknown'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Car className="h-4 w-4" />
                        <span>
                          {'instructor' in lesson && typeof lesson.instructor === 'string'
                            ? lesson.instructor 
                            : lesson.instructor && typeof lesson.instructor === 'object'
                              ? `${lesson.instructor.firstName} ${lesson.instructor.lastName}`
                              : 'Unknown Instructor'
                          }
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {'vehicle' in lesson && typeof lesson.vehicle === 'string'
                          ? lesson.vehicle 
                          : lesson.vehicle && typeof lesson.vehicle === 'object'
                            ? `${lesson.vehicle.make} ${lesson.vehicle.model} (${lesson.vehicle.licensePlate})`
                            : 'Unknown Vehicle'
                        }
                      </div>
                    </div>
                    
                    <Badge className={getStatusColor(lesson.status)}>
                      {lesson.status}
                    </Badge>
                    
                    <div className="text-sm text-gray-600">
                      ETA: {lesson.etaMinutes}m
                    </div>
                  </div>
                </div>

                {selectedLesson === lesson.id && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Pickup Address</p>
                        <p className="text-sm text-gray-600">
                          {'pickupAddress' in lesson && typeof lesson.pickupAddress === 'string'
                            ? lesson.pickupAddress 
                            : lesson.pickupAddress && typeof lesson.pickupAddress === 'object'
                              ? `${lesson.pickupAddress.street}, ${lesson.pickupAddress.city}, ${lesson.pickupAddress.state}`
                              : 'No pickup address'
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">Dropoff Address</p>
                        <p className="text-sm text-gray-600">
                          {'dropoffAddress' in lesson && typeof lesson.dropoffAddress === 'string'
                            ? lesson.dropoffAddress 
                            : lesson.dropoffAddress && typeof lesson.dropoffAddress === 'object'
                              ? `${lesson.dropoffAddress.street}, ${lesson.dropoffAddress.city}, ${lesson.dropoffAddress.state}`
                              : 'No dropoff address'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" variant="outline">
                        Edit Lesson
                      </Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline">
                        Cancel
                      </Button>
                      <Button size="sm" className="bg-[#0E7C86] hover:bg-[#0E7C86]/90">
                        Optimize Route
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            ))
          )}
        </div>

        <div className="mt-8 p-6 bg-[#0E7C86]/5 rounded-lg">
          <h3 className="font-semibold text-[#0E7C86] mb-2">Route Optimization</h3>
          <p className="text-gray-600 mb-4">
            Current schedule optimized for minimal travel time. Total estimated travel: 60 minutes.
          </p>
          <div className="flex space-x-2">
            <Button size="sm" className="bg-[#0E7C86] hover:bg-[#0E7C86]/90">
              Recalculate Routes
            </Button>
            <Button size="sm" variant="outline">
              View Map
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
