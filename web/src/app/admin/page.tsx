'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Users, Car, MapPin, Package, Settings, BarChart3, FileText, MessageSquare, DollarSign, Shield } from 'lucide-react'

export default function AdminPage() {
  const mockStats = {
    totalStudents: 124,
    activeInstructors: 8,
    totalVehicles: 12,
    monthlyRevenue: 28450,
    lessonsThisWeek: 89,
    utilizationRate: 78,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-[#0E7C86]">
              All N 1 Driving School
            </div>
            <span className="text-sm text-gray-500">Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Profile</Button>
            <Button variant="ghost">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your driving school operations and settings</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0E7C86]">{mockStats.totalStudents}</div>
              <p className="text-xs text-gray-500">+12 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Instructors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0E7C86]">{mockStats.activeInstructors}</div>
              <p className="text-xs text-gray-500">2 on duty today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0E7C86]">${mockStats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-gray-500">+18% vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Utilization Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0E7C86]">{mockStats.utilizationRate}%</div>
              <p className="text-xs text-gray-500">Instructor efficiency</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/students">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Users className="h-5 w-5" />
                  <span>Students</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage student records, progress, and enrollments
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/instructors">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Users className="h-5 w-5" />
                  <span>Instructors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage instructor profiles, certifications, and schedules
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/vehicles">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Car className="h-5 w-5" />
                  <span>Vehicles</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track vehicle fleet, maintenance, and assignments
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/zones">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <MapPin className="h-5 w-5" />
                  <span>Service Zones</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Configure service areas and routing optimization
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/packages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Package className="h-5 w-5" />
                  <span>Packages & Pricing</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage lesson packages, pricing, and add-ons
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/reports">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <BarChart3 className="h-5 w-5" />
                  <span>Reports & Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View revenue, utilization, and performance metrics
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/messages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messaging</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Configure templates, send messages, view logs
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/billing">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <DollarSign className="h-5 w-5" />
                  <span>Billing & Payments</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Manage invoices, payments, and financial settings
                </CardDescription>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/settings">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Configure policies, integrations, and system settings
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">New enrollment: Sarah Wilson</p>
                    <p className="text-sm text-gray-600">Full Course package - $360</p>
                  </div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">Lesson completed: John Smith</p>
                    <p className="text-sm text-gray-600">Instructor: Mike Johnson</p>
                  </div>
                  <div className="text-xs text-gray-500">4 hours ago</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-semibold">Payment received: $260</p>
                    <p className="text-sm text-gray-600">Road Test Prep - David Brown</p>
                  </div>
                  <div className="text-xs text-gray-500">6 hours ago</div>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/admin/audit">
                  <Button variant="outline" className="w-full">
                    View Full Activity Log
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database</span>
                  <span className="text-green-600 font-semibold">Healthy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Stripe Integration</span>
                  <span className="text-green-600 font-semibold">Connected</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Google Maps API</span>
                  <span className="text-yellow-600 font-semibold">Mock Mode</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Twilio SMS</span>
                  <span className="text-yellow-600 font-semibold">Mock Mode</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">SendGrid Email</span>
                  <span className="text-yellow-600 font-semibold">Mock Mode</span>
                </div>
              </div>
              <div className="mt-4">
                <Link href="/admin/integrations">
                  <Button variant="outline" className="w-full">
                    <Shield className="h-4 w-4 mr-2" />
                    Configure Integrations
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
