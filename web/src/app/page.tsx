import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-[#0E7C86]">
              All N 1 Driving School
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/enroll">
              <Button className="bg-[#0E7C86] hover:bg-[#0E7C86]/90">
                Enroll Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-[#0F172A] mb-6">
            Learn to Drive with Confidence
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Professional driving instruction in the Atlanta metro area. 
            Expert instructors, flexible scheduling, and proven results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enroll">
              <Button size="lg" className="bg-[#0E7C86] hover:bg-[#0E7C86]/90">
                Start Learning Today
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline">
                Get Demo
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">Expert Instructors</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Certified professionals with years of experience teaching safe driving habits.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">Flexible Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Book lessons that fit your schedule. Easy online booking and rescheduling.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-[#0E7C86]">Atlanta Metro Coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Serving Carrollton, Douglasville, Marietta, McDonough, and surrounding areas.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="bg-[#0E7C86] text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-6">
            Choose from our flexible packages designed for every learning style.
          </p>
          <Link href="/enroll">
            <Button size="lg" variant="secondary" className="bg-white text-[#0E7C86] hover:bg-gray-100">
              View Packages & Enroll
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 All N 1 Driving School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
