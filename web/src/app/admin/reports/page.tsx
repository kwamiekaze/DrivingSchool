'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BarChart3, Download, Calendar, DollarSign, Users, Car, MapPin, TrendingUp } from 'lucide-react'

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedReport, setSelectedReport] = useState('revenue')

  const mockRevenueData = {
    total: 28450,
    growth: 18,
    breakdown: [
      { package: 'Full Course', revenue: 14400, count: 40 },
      { package: 'Road Test Prep', revenue: 10400, count: 40 },
      { package: 'Starter Drive', revenue: 2800, count: 20 },
      { package: 'Add-ons', revenue: 850, count: 43 },
    ]
  }

  const mockUtilizationData = {
    instructors: [
      { name: 'Mike Johnson', hours: 32, utilization: 80, zone: 'West/SW' },
      { name: 'Lisa Chen', hours: 30, utilization: 75, zone: 'South' },
      { name: 'David Rodriguez', hours: 28, utilization: 70, zone: 'East/SE' },
      { name: 'Sarah Williams', hours: 35, utilization: 88, zone: 'North/NW' },
    ],
    vehicles: [
      { model: 'Honda Civic (ABC-123)', hours: 38, utilization: 95, zone: 'West/SW' },
      { model: 'Toyota Corolla (XYZ-789)', hours: 35, utilization: 88, zone: 'South' },
      { model: 'Nissan Sentra (DEF-456)', hours: 32, utilization: 80, zone: 'East/SE' },
    ],
    zones: [
      { name: 'West/SW', lessons: 45, avgTravelTime: 12, efficiency: 92 },
      { name: 'South', lessons: 38, avgTravelTime: 15, efficiency: 85 },
      { name: 'East/SE', lessons: 32, avgTravelTime: 18, efficiency: 78 },
      { name: 'North/NW', lessons: 28, avgTravelTime: 14, efficiency: 88 },
      { name: 'Intown', lessons: 22, avgTravelTime: 20, efficiency: 75 },
    ]
  }

  const mockCancellationData = [
    { reason: 'Student illness', count: 8, percentage: 32 },
    { reason: 'Weather conditions', count: 5, percentage: 20 },
    { reason: 'Schedule conflict', count: 4, percentage: 16 },
    { reason: 'Vehicle maintenance', count: 3, percentage: 12 },
    { reason: 'Instructor unavailable', count: 3, percentage: 12 },
    { reason: 'Other', count: 2, percentage: 8 },
  ]

  const exportReport = (format: 'csv' | 'pdf') => {
    console.log(`Exporting ${selectedReport} report as ${format}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/admin" className="text-2xl font-bold text-[#0E7C86]">
              Driving School
            </Link>
            <span className="text-sm text-gray-500">Reports</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Profile</Button>
            <Button variant="ghost">Sign Out</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Track performance and generate insights</p>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedReport} onValueChange={setSelectedReport}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select report" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue Report</SelectItem>
              <SelectItem value="utilization">Utilization Report</SelectItem>
              <SelectItem value="cancellations">Cancellation Analysis</SelectItem>
              <SelectItem value="pipeline">Lesson Pipeline</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => exportReport('csv')}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => exportReport('pdf')}>
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {selectedReport === 'revenue' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <DollarSign className="h-5 w-5" />
                  <span>Revenue Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-[#0E7C86] mb-2">
                      ${mockRevenueData.total.toLocaleString()}
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-semibold">+{mockRevenueData.growth}%</span>
                      <span className="text-gray-600">vs last month</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {mockRevenueData.breakdown.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{item.package}</span>
                          <span className="text-sm text-gray-600 ml-2">({item.count} sold)</span>
                        </div>
                        <span className="font-semibold">${item.revenue.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedReport === 'utilization' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                    <Users className="h-5 w-5" />
                    <span>Instructor Utilization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUtilizationData.instructors.map((instructor, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{instructor.name}</p>
                          <p className="text-sm text-gray-600">{instructor.zone}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{instructor.utilization}%</p>
                          <p className="text-sm text-gray-600">{instructor.hours}h</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                    <Car className="h-5 w-5" />
                    <span>Vehicle Utilization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUtilizationData.vehicles.map((vehicle, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{vehicle.model}</p>
                          <p className="text-sm text-gray-600">{vehicle.zone}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{vehicle.utilization}%</p>
                          <p className="text-sm text-gray-600">{vehicle.hours}h</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                    <MapPin className="h-5 w-5" />
                    <span>Zone Efficiency</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUtilizationData.zones.map((zone, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{zone.name}</p>
                          <p className="text-sm text-gray-600">{zone.lessons} lessons</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{zone.efficiency}%</p>
                          <p className="text-sm text-gray-600">{zone.avgTravelTime}m avg</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedReport === 'cancellations' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <BarChart3 className="h-5 w-5" />
                  <span>Cancellation Analysis</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Cancellation Reasons</h3>
                      <div className="space-y-3">
                        {mockCancellationData.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm">{item.reason}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{item.count}</span>
                              <Badge variant="outline">{item.percentage}%</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold mb-3">Key Metrics</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Cancellations</span>
                          <span className="font-semibold">25</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cancellation Rate</span>
                          <span className="font-semibold">12.5%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">No-Show Rate</span>
                          <span className="font-semibold">3.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Avg Notice Period</span>
                          <span className="font-semibold">18 hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedReport === 'pipeline' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-[#0E7C86]">
                  <Calendar className="h-5 w-5" />
                  <span>Lesson Pipeline</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">45</div>
                    <div className="text-sm text-gray-600">Scheduled</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <div className="text-sm text-gray-600">In Progress</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-600">89</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">6</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Upcoming Week</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Monday, Aug 12</span>
                      <span className="font-semibold">8 lessons</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Tuesday, Aug 13</span>
                      <span className="font-semibold">12 lessons</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Wednesday, Aug 14</span>
                      <span className="font-semibold">10 lessons</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Thursday, Aug 15</span>
                      <span className="font-semibold">15 lessons</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <span>Friday, Aug 16</span>
                      <span className="font-semibold">11 lessons</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Download className="h-6 w-6" />
                  <span>Export All Data</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Schedule Report</span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2">
                  <BarChart3 className="h-6 w-6" />
                  <span>Custom Dashboard</span>
                </Button>
                
                <Link href="/admin/audit">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 w-full">
                    <Users className="h-6 w-6" />
                    <span>Audit Log</span>
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
