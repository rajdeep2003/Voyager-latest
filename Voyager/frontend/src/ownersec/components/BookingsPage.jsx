"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Calendar, Search, Phone, Mail } from "lucide-react"

export default function BookingsPage() {
  const [bookings] = useState([
    {
      id: "BK001",
      guestName: "Rajesh Kumar",
      guestEmail: "rajesh.kumar@email.com",
      guestPhone: "+91 9876543210",
      roomNumber: "101",
      roomType: "Deluxe Room",
      checkIn: "2024-01-15",
      checkOut: "2024-01-18",
      status: "confirmed",
      totalAmount: 15000,
      nights: 3,
    },
    {
      id: "BK002",
      guestName: "Priya Sharma",
      guestEmail: "priya.sharma@email.com",
      guestPhone: "+91 9876543211",
      roomNumber: "205",
      roomType: "Suite",
      checkIn: "2024-01-14",
      checkOut: "2024-01-16",
      status: "checked-in",
      totalAmount: 25000,
      nights: 2,
    },
    {
      id: "BK003",
      guestName: "Amit Patel",
      guestEmail: "amit.patel@email.com",
      guestPhone: "+91 9876543212",
      roomNumber: "302",
      roomType: "Standard Room",
      checkIn: "2024-01-10",
      checkOut: "2024-01-13",
      status: "checked-out",
      totalAmount: 12000,
      nights: 3,
    },
    {
      id: "BK004",
      guestName: "Sneha Gupta",
      guestEmail: "sneha.gupta@email.com",
      guestPhone: "+91 9876543213",
      roomNumber: "150",
      roomType: "Deluxe Room",
      checkIn: "2024-01-16",
      checkOut: "2024-01-20",
      status: "confirmed",
      totalAmount: 20000,
      nights: 4,
    },
    {
      id: "BK005",
      guestName: "Vikram Singh",
      guestEmail: "vikram.singh@email.com",
      guestPhone: "+91 9876543214",
      roomNumber: "401",
      roomType: "Presidential Suite",
      checkIn: "2024-01-15",
      checkOut: "2024-01-17",
      status: "checked-in",
      totalAmount: 35000,
      nights: 2,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "checked-in":
        return "bg-green-100 text-green-800"
      case "checked-out":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.roomNumber.includes(searchTerm) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || booking.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508614999368-9260051292e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D')" }}>
 
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filter */}
      <Card className="mb-6 bg-white">
        <CardHeader>
          <CardTitle>Search & Filter Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by guest name, room number, or booking ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                onClick={() => setFilterStatus("all")}
                size="sm"
              >
                All
              </Button>
              <Button
                variant={filterStatus === "confirmed" ? "default" : "outline"}
                onClick={() => setFilterStatus("confirmed")}
                size="sm"
              >
                Confirmed
              </Button>
              <Button
                variant={filterStatus === "checked-in" ? "default" : "outline"}
                onClick={() => setFilterStatus("checked-in")}
                size="sm"
              >
                Checked In
              </Button>
              <Button
                variant={filterStatus === "checked-out" ? "default" : "outline"}
                onClick={() => setFilterStatus("checked-out")}
                size="sm"
              >
                Checked Out
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-md transition-shadow bg-white">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{booking.guestName}</h3>
                      <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
                    </div>
                    <Badge className={getStatusColor(booking.status)}>
                      {booking.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Room</p>
                      <p className="font-medium">
                        {booking.roomNumber} - {booking.roomType}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Check-in</p>
                      <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Check-out</p>
                      <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Total Amount</p>
                      <p className="font-medium">₹{booking.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span>{booking.guestEmail}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>{booking.guestPhone}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.nights} nights</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {booking.status === "confirmed" && <Button size="sm">Check In</Button>}
                    {booking.status === "checked-in" && (
                      <Button size="sm" variant="secondary">
                        Check Out
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
    </div>
  )
}
