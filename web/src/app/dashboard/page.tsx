'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Calendar, Users, Car, MapPin, BarChart3, Settings } from 'lucide-react'

export default function DashboardPage() {
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
            <Button variant="ghost">Profile</Button>
            <Button variant="ghost">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your driving school operations</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/dashboard/schedule">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Calendar className="h-5 w-5" />
                  <span>Schedule Board</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage lessons, drag-drop scheduling, and view ETA optimization
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/students">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Users className="h-5 w-5" />
                  <span>Students</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View student progress, manage enrollments, and track lessons
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/instructors">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Users className="h-5 w-5" />
                  <span>Instructors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage instructor schedules, certifications, and assignments
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/vehicles">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Car className="h-5 w-5" />
                  <span>Vehicles</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track vehicle availability, maintenance, and assignments
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/zones">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <MapPin className="h-5 w-5" />
                  <span>Zones</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Configure service zones and optimize routing efficiency
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/reports">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <BarChart3 className="h-5 w-5" />
                  <span>Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View analytics, revenue reports, and export data
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">Today&apos;s Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">John Smith - Full Course</p>
                    <p className="text-sm text-gray-600">9:00 AM - 10:00 AM</p>
                  </div>
                  <div className="text-sm text-gray-500">Instructor: Mike</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">Sarah Johnson - Road Test Prep</p>
                    <p className="text-sm text-gray-600">11:00 AM - 12:00 PM</p>
                  </div>
                  <div className="text-sm text-gray-500">Instructor: Lisa</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">David Brown - Starter Drive</p>
                    <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
                  </div>
                  <div className="text-sm text-gray-500">Instructor: Mike</div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/dashboard/schedule">
                  <Button className="w-full bg-[#0E7C86] hover:bg-[#0E7C86]/90">
                    View Full Schedule
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Students</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons This Week</span>
                  <span className="font-semibold">18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue This Month</span>
                  <span className="font-semibold">$4,320</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Instructor Utilization</span>
                  <span className="font-semibold">78%</span>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/dashboard/reports">
                  <Button variant="outline" className="w-full">
                    View Detailed Reports
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
