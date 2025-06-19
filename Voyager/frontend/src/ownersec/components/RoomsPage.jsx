"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Bed, Users, Wifi, Car, Coffee, Tv, Bath } from "lucide-react"

export default function RoomsPage() {
  const [rooms] = useState([
    {
      id: "R001",
      number: "101",
      type: "Standard Room",
      floor: 1,
      capacity: 2,
      price: 4000,
      status: "available",
      amenities: ["wifi", "tv", "ac", "bathroom"],
    },
    {
      id: "R002",
      number: "102",
      type: "Deluxe Room",
      floor: 1,
      capacity: 3,
      price: 6000,
      status: "occupied",
      amenities: ["wifi", "tv", "ac", "bathroom", "minibar"],
      currentGuest: "Rajesh Kumar",
      checkOut: "2024-01-18",
    },
    {
      id: "R003",
      number: "201",
      type: "Suite",
      floor: 2,
      capacity: 4,
      price: 12000,
      status: "available",
      amenities: ["wifi", "tv", "ac", "bathroom", "minibar", "balcony"],
    },
    {
      id: "R004",
      number: "202",
      type: "Deluxe Room",
      floor: 2,
      capacity: 3,
      price: 6000,
      status: "cleaning",
      amenities: ["wifi", "tv", "ac", "bathroom", "minibar"],
    },
    {
      id: "R005",
      number: "301",
      type: "Presidential Suite",
      floor: 3,
      capacity: 6,
      price: 20000,
      status: "occupied",
      amenities: ["wifi", "tv", "ac", "bathroom", "minibar", "balcony", "jacuzzi"],
      currentGuest: "Vikram Singh",
      checkOut: "2024-01-17",
    },
    {
      id: "R006",
      number: "302",
      type: "Standard Room",
      floor: 3,
      capacity: 2,
      price: 4000,
      status: "maintenance",
      amenities: ["wifi", "tv", "ac", "bathroom"],
    },
  ])

  const [filterStatus, setFilterStatus] = useState("all")
  const [filterFloor, setFilterFloor] = useState("all")

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800"
      case "occupied":
        return "bg-red-100 text-red-800"
      case "cleaning":
        return "bg-yellow-100 text-yellow-800"
      case "maintenance":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="w-4 h-4" />
      case "tv":
        return <Tv className="w-4 h-4" />
      case "parking":
        return <Car className="w-4 h-4" />
      case "minibar":
        return <Coffee className="w-4 h-4" />
      case "bathroom":
        return <Bath className="w-4 h-4" />
      default:
        return <Bed className="w-4 h-4" />
    }
  }

  const filteredRooms = rooms.filter((room) => {
    const matchesStatus = filterStatus === "all" || room.status === filterStatus
    const matchesFloor = filterFloor === "all" || room.floor.toString() === filterFloor
    return matchesStatus && matchesFloor
  })

  const roomStats = {
    total: rooms.length,
    available: rooms.filter((r) => r.status === "available").length,
    occupied: rooms.filter((r) => r.status === "occupied").length,
    maintenance: rooms.filter((r) => r.status === "maintenance").length,
    cleaning: rooms.filter((r) => r.status === "cleaning").length,
  }

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1508614999368-9260051292e5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D')" }}>
 
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Room Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold">{roomStats.total}</div>
            <div className="text-sm text-gray-600">Total Rooms</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{roomStats.available}</div>
            <div className="text-sm text-gray-600">Available</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{roomStats.occupied}</div>
            <div className="text-sm text-gray-600">Occupied</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{roomStats.cleaning}</div>
            <div className="text-sm text-gray-600">Cleaning</div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{roomStats.maintenance}</div>
            <div className="text-sm text-gray-600">Maintenance</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6 bg-white">
        <CardHeader>
          <CardTitle>Filter Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  onClick={() => setFilterStatus("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterStatus === "available" ? "default" : "outline"}
                  onClick={() => setFilterStatus("available")}
                  size="sm"
                >
                  Available
                </Button>
                <Button
                  variant={filterStatus === "occupied" ? "default" : "outline"}
                  onClick={() => setFilterStatus("occupied")}
                  size="sm"
                >
                  Occupied
                </Button>
                <Button
                  variant={filterStatus === "cleaning" ? "default" : "outline"}
                  onClick={() => setFilterStatus("cleaning")}
                  size="sm"
                >
                  Cleaning
                </Button>
                <Button
                  variant={filterStatus === "maintenance" ? "default" : "outline"}
                  onClick={() => setFilterStatus("maintenance")}
                  size="sm"
                >
                  Maintenance
                </Button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Floor</label>
              <div className="flex gap-2">
                <Button
                  variant={filterFloor === "all" ? "default" : "outline"}
                  onClick={() => setFilterFloor("all")}
                  size="sm"
                >
                  All Floors
                </Button>
                <Button
                  variant={filterFloor === "1" ? "default" : "outline"}
                  onClick={() => setFilterFloor("1")}
                  size="sm"
                >
                  Floor 1
                </Button>
                <Button
                  variant={filterFloor === "2" ? "default" : "outline"}
                  onClick={() => setFilterFloor("2")}
                  size="sm"
                >
                  Floor 2
                </Button>
                <Button
                  variant={filterFloor === "3" ? "default" : "outline"}
                  onClick={() => setFilterFloor("3")}
                  size="sm"
                >
                  Floor 3
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="hover:shadow-md transition-shadow bg-white ">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Room {room.number}</CardTitle>
                  <CardDescription>
                    {room.type} • Floor {room.floor}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(room.status)}>{room.status.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">Up to {room.capacity} guests</span>
                  </div>
                  <div className="text-lg font-semibold">₹{room.price.toLocaleString()}/night</div>
                </div>

                {room.currentGuest && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium">Current Guest: {room.currentGuest}</p>
                    <p className="text-sm text-gray-600">Check-out: {room.checkOut}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium mb-2">Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                        {getAmenityIcon(amenity)}
                        <span className="capitalize">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Edit Room
                  </Button>
                  {room.status === "available" && (
                    <Button size="sm" className="flex-1">
                      Book Room
                    </Button>
                  )}
                  {room.status === "occupied" && (
                    <Button size="sm" variant="secondary" className="flex-1">
                      Check Out
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Bed className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No rooms found</h3>
            <p className="text-gray-600">Try adjusting your filter criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
    </div>
  )
}
