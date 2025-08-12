'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, Clock, CheckCircle, XCircle, MessageSquare, Camera } from 'lucide-react'

export default function InstructorMobilePage() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)

  const mockInstructor = {
    firstName: 'Mike',
    lastName: 'Johnson',
    vehicle: 'Honda Civic (ABC-123)',
  }

  const mockTodayLessons = [
    {
      id: '1',
      studentName: 'John Smith',
      packageType: 'Full Course',
      time: '9:00 AM - 10:00 AM',
      pickupAddress: '123 Main St, Carrollton, GA 30117',
      dropoffAddress: '456 Oak Ave, Carrollton, GA 30117',
      status: 'scheduled',
      eta: '9:00 AM',
      skills: ['Parallel Parking', 'Highway Merging', 'Three-Point Turn'],
      notes: '',
    },
    {
      id: '2',
      studentName: 'Sarah Johnson',
      packageType: 'Road Test Prep',
      time: '11:00 AM - 12:00 PM',
      pickupAddress: '789 Pine St, Douglasville, GA 30134',
      dropoffAddress: '321 Elm Dr, Douglasville, GA 30134',
      status: 'in_progress',
      eta: '11:05 AM',
      skills: ['Road Test Skills', 'Confidence Building'],
      notes: '',
    },
    {
      id: '3',
      studentName: 'David Brown',
      packageType: 'Starter Drive',
      time: '2:00 PM - 3:00 PM',
      pickupAddress: '555 Maple Rd, Villa Rica, GA 30180',
      dropoffAddress: '777 Cedar Ln, Villa Rica, GA 30180',
      status: 'scheduled',
      eta: '2:00 PM',
      skills: ['Basic Controls', 'Parking', 'Turning'],
      notes: '',
    },
  ]

  const currentLesson = mockTodayLessons[currentLessonIndex]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500'
      case 'in_progress': return 'bg-green-500'
      case 'completed': return 'bg-gray-500'
      case 'no_show': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const markPickup = () => {
    console.log('Marked pickup for lesson:', currentLesson.id)
  }

  const markDropoff = () => {
    console.log('Marked dropoff for lesson:', currentLesson.id)
    if (currentLessonIndex < mockTodayLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const markNoShow = () => {
    console.log('Marked no-show for lesson:', currentLesson.id)
    if (currentLessonIndex < mockTodayLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold text-[#0E7C86]">
              All N 1 Driving School
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {mockInstructor.firstName} {mockInstructor.lastName}
            </span>
            <Button variant="ghost" size="sm">Menu</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-md">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Today's Route</h1>
          <p className="text-gray-600">{mockInstructor.vehicle}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Lesson {currentLessonIndex + 1} of {mockTodayLessons.length}</h2>
            <Badge className={getStatusColor(currentLesson.status)}>
              {currentLesson.status.replace('_', ' ')}
            </Badge>
          </div>

          <Card className="mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{currentLesson.studentName}</CardTitle>
              <CardDescription>{currentLesson.packageType} • {currentLesson.time}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-700 flex items-center space-x-1 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>Pickup</span>
                  </p>
                  <p className="text-sm text-gray-600 ml-5">{currentLesson.pickupAddress}</p>
                  <p className="text-xs text-gray-500 ml-5">ETA: {currentLesson.eta}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-700 flex items-center space-x-1 mb-1">
                    <MapPin className="h-4 w-4" />
                    <span>Dropoff</span>
                  </p>
                  <p className="text-sm text-gray-600 ml-5">{currentLesson.dropoffAddress}</p>
                </div>

                <div>
                  <p className="font-medium text-gray-700 mb-2">Skills to Practice</p>
                  <div className="flex flex-wrap gap-1">
                    {currentLesson.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button 
              className="bg-[#0E7C86] hover:bg-[#0E7C86]/90"
              onClick={() => window.open(`https://maps.google.com/dir/?api=1&destination=${encodeURIComponent(currentLesson.pickupAddress)}`, '_blank')}
            >
              <Navigation className="h-4 w-4 mr-2" />
              Navigate
            </Button>
            <Button variant="outline" onClick={markPickup}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Pickup
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button variant="outline" onClick={markDropoff}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Dropoff
            </Button>
            <Button variant="outline" onClick={markNoShow}>
              <XCircle className="h-4 w-4 mr-2" />
              No Show
            </Button>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Student
            </Button>
            <Button variant="outline" className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-[#0E7C86]">Lesson Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <textarea
              className="w-full h-24 p-3 border rounded-md resize-none"
              placeholder="Add notes about this lesson..."
              value={currentLesson.notes}
              onChange={(e) => {
                const updatedLessons = [...mockTodayLessons]
                updatedLessons[currentLessonIndex].notes = e.target.value
              }}
            />
            <Button className="w-full mt-3 bg-[#0E7C86] hover:bg-[#0E7C86]/90">
              Save Notes
            </Button>
          </CardContent>
        </Card>

        {currentLessonIndex < mockTodayLessons.length - 1 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">Next Lesson</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <p className="font-medium">{mockTodayLessons[currentLessonIndex + 1].studentName}</p>
                <p className="text-gray-600">{mockTodayLessons[currentLessonIndex + 1].time}</p>
                <p className="text-gray-600">{mockTodayLessons[currentLessonIndex + 1].pickupAddress}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
