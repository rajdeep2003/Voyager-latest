const hotels = [
  {
    id: 1,
    name: "Grand Plaza Hotel",
    location: "New York City, NY",
    price: 299,
    rating: 4.8,
    image: "https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdyYW5kJTIwcGxhemElMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
    images: [
      "https://plus.unsplash.com/premium_photo-1661963123153-5471a95b7042?w=600&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1653280675477-878425ecb5f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyYW5kcGxhemElMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D",
      "https://plus.unsplash.com/premium_photo-1674651240687-92b4ad15d0ea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGdyYW5kcGxhemElMjBob3RlbHxlbnwwfHwwfHx8MA%3D%3D"
    ],
    amenities: ["Free WiFi", "Pool", "Spa", "Gym", "Restaurant"],
    description: "Experience luxury in the heart of Manhattan with stunning city views and world-class service.",
    duration: "1 night",
    people: "2 adults",
    geolocation: {
      latitude: 40.7580,
      longitude: -73.9855
    },
    roomTypes: [
      { type: "Standard", price: 279, available: 3, total: 10 },
      { type: "Deluxe", price: 209, available: 7, total: 10 },
      { type: "Suite", price: 349, available: 2, total: 9 }
    ],
    isActive: true
  },
  {
    id: 2,
    name: "Oceanview Resort",
    location: "Miami Beach, FL",
    price: 349,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1646598446711-e320fe4af62e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8b2NlYW4lMjB2aWV3JTIwcmVzb3J0fGVufDB8fDB8fHww",
    images: [
      "https://images.unsplash.com/photo-1646598446711-e320fe4af62e?w=600",
      "https://images.unsplash.com/photo-1576678927489-4b1aa6c3ab9b?w=600",
      "https://images.unsplash.com/photo-1600585154505-9808f73bd1c7?w=600"
    ],
    amenities: ["Beachfront", "Pool", "Spa", "Free Breakfast", "Bar"],
    description: "Beachfront paradise with private balconies and direct access to pristine white sand beaches.",
    duration: "1 night",
    people: "2 adults",
    geolocation: {
      latitude: 25.7932,
      longitude: -80.1306
    },
    roomTypes: [
      { type: "Standard", price: 299, available: 5, total: 12 },
      { type: "Deluxe", price: 399, available: 4, total: 8 },
      { type: "Suite", price: 499, available: 3, total: 6 }
    ],
    isActive: true 
  },
  {
    id: 3,
    name: "Mountain Lodge",
    location: "Aspen, CO",
    price: 279,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1621765663900-f132db309fda?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    images: [
      "https://images.unsplash.com/photo-1621765663900-f132db309fda?q=80&w=600",
      "https://images.unsplash.com/photo-1621765663900-f132db309fda?q=80&w=600",
      "https://images.unsplash.com/photo-1621765663900-f132db309fda?q=80&w=600"
    ],
    amenities: ["Fireplace", "Ski-in/Ski-out", "Hot Tub", "Restaurant", "Bar"],
    description: "Cozy mountain retreat with ski-in/ski-out access and breathtaking alpine views.",
    duration: "1 night",
    people: "2 adults", 
    geolocation: {
      latitude: 39.1911,
      longitude: -106.8175
    },
    roomTypes: [
      { type: "Standard", price: 249, available: 4, total: 8 },
      { type: "Deluxe", price: 329, available: 3, total: 6 },
      { type: "Suite", price: 429, available: 2, total: 4 }
    ],
    isActive: true
  }
];

module.exports = hotels; 