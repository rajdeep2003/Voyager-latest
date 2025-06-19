"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Calendar, Users, Bed, TrendingUp } from "lucide-react"

export default function Dashboard({ onNavigate }) {
  const [stats] = useState({
    totalBookings: 45,
    todayCheckIns: 8,
    todayCheckOuts: 5,
    occupancyRate: 78,
    availableRooms: 22,
    totalRooms: 100,
    revenue: 125000,
  })

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508614999368-9260051292e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D')" }}>
 
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 ">
        <Card className="bg-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalRooms - stats.availableRooms} of {stats.totalRooms} rooms occupied
            </p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-300" >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Rooms</CardTitle>
            <Bed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.availableRooms}</div>
            <p className="text-xs text-muted-foreground">Ready for booking</p>
          </CardContent>
        </Card>

        <Card className="bg-green-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{stats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-green-100">
          <CardHeader>
            <CardTitle>Today's Check-ins</CardTitle>
            <CardDescription>Guests arriving today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.todayCheckIns}</div>
            <p className="text-sm text-gray-600">Expected arrivals</p>
          </CardContent>
        </Card>

        <Card className="bg-indigo-100">
          <CardHeader>
            <CardTitle>Today's Check-outs</CardTitle>
            <CardDescription>Guests departing today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.todayCheckOuts}</div>
            <p className="text-sm text-gray-600">Expected departures</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your hotel operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <Button
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 border-1 border-black bg-blue-100 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-blue-500 rounded-lg p-4 active:scale-95 cursor-pointer"
              onClick={() => onNavigate("bookings")}
            >
              <Calendar className="w-6 h-6" />
              <span>View Bookings</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-amber-100 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-blue-500  rounded-lg p-4 active:scale-95 cursor-pointer"
              onClick={() => onNavigate("rooms")}
            >
              <Bed className="w-6 h-6" />
              <span>Manage Rooms</span>
            </Button>

            <Button
              variant="outline"
              className="w-full h-20 flex flex-col items-center justify-center space-y-2 bg-purple-100 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:border-blue-500  rounded-lg p-4 active:scale-95 cursor-pointer"
              onClick={() => onNavigate("analytics")}
            >
              <TrendingUp className="w-6 h-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}
