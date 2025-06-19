"use client";
import { useState, useRef, useEffect } from "react";
import { HotelCard } from "./hotel-card";
import GameSelector from "./GameSelector";
import { MapPin, Calendar, Users } from "./icons";

export default function HotelBooking() {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([200, 400]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [discount, setDiscount] = useState(null);
  const [showGameSelector, setShowGameSelector] = useState(false);
  const [roomType, setRoomType] = useState("standard");
  const [sidebarRooms, setSidebarRooms] = useState(1);
  const gameSelectorRef = useRef(null);

  // Fetch hotels on component mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/hotels");
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  // Sync sidebarRooms and rooms
  useEffect(() => {
    setRooms(sidebarRooms);
  }, [sidebarRooms]);

  // Filter hotels based on search query and price range
  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch =
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase());

    const hasRoomInPriceRange = hotel.roomTypes.some(
      (rt) => rt.price >= priceRange[0] && rt.price <= priceRange[1]
    );

    const desiredCheckIn = new Date(checkInDate);
    const desiredCheckOut = new Date(checkOutDate);

    const matchingRooms = hotel.bookingstatus.filter((room) => {
      if (room.roomType.toLowerCase() !== roomType.toLowerCase()) return false;

      if (!room.bookingId) return true;

      const roomIn = new Date(room.checkIn);
      const roomOut = new Date(room.checkOut);

      const noOverlap = desiredCheckOut <= roomIn || desiredCheckIn >= roomOut;

      return noOverlap;
    });

    const hasEnoughAvailableRooms =
      !checkInDate || !checkOutDate || !roomType || !sidebarRooms
        ? true
        : matchingRooms.length >= sidebarRooms;

    return matchesSearch && hasRoomInPriceRange && hasEnoughAvailableRooms;
  });

  useEffect(() => {
    if (selectedHotel) {
      // Set main image
      setMainImage(selectedHotel.images?.[0] || null);

      // Set default room type
      const defaultType = selectedHotel.roomTypes.find(
        (rt) => rt.available > 0
      );
      if (defaultType) setRoomType(defaultType.type);
    }
  }, [selectedHotel]);

  const calculateDays = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const start = new Date(checkInDate);
    const end = new Date(checkOutDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const getBasePrice = () => {
    if (!selectedHotel) return 0;
    const selectedRoomType = selectedHotel.roomTypes.find(
      (rt) => rt.type.toLowerCase() === roomType.toLowerCase()
    );
    return selectedRoomType ? selectedRoomType.price : 0;
  };

  const calculateTotalPrice = () => {
    const basePrice = getBasePrice();
    const days = calculateDays();
    return basePrice * days * rooms;
  };

  const calculateFinalPrice = () => {
    const total = calculateTotalPrice();
    const discounted = discount ? total - total * (discount / 100) : total;
    return Math.round(discounted * 1.12); // 12% tax
  };

  const handleBookNow = (hotelId) => {
    const hotel = hotels.find((h) => h.id === hotelId);
    setSelectedHotel(hotel);
    setMainImage(hotel.images?.[0] || null);
    setShowGameSelector(false);
    setDiscount(null);

    // Set initial room type to the first available room type
    const firstAvailableRoomType = hotel.roomTypes.find(
      (rt) => rt.available > 0
    );
    if (firstAvailableRoomType) {
      setRoomType(firstAvailableRoomType.type);
    }
  };

  const handleBackToResults = () => {
    setSelectedHotel(null);
    setShowGameSelector(false);
  };

  const handleDiscountWon = (discountAmount) => setDiscount(discountAmount);

  const handleDiscountClick = () => {
    setShowGameSelector(true);
    setTimeout(
      () => gameSelectorRef.current?.scrollIntoView({ behavior: "smooth" }),
      100
    );
  };

  useEffect(() => {
    if (showGameSelector && gameSelectorRef.current) {
      gameSelectorRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showGameSelector]);

  const getGoogleMapsLink = (hotel) => {
    return `https://www.google.com/maps/search/?api=1&query=${hotel.geolocation.latitude},${hotel.geolocation.longitude}`;
  };

  const ImageAlbum = ({ hotel }) => (
    <>
      <div className="relative overflow-hidden rounded-lg shadow-lg aspect-video group">
        <img
          src={mainImage || hotel.images?.[0] || "/placeholder.svg"}
          alt={`${hotel.name} main view`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
      </div>

      {hotel.images?.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
          {hotel.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              onClick={() => setMainImage(img)}
              className={`h-20 w-32 flex-shrink-0 cursor-pointer rounded-md object-cover ring-2 transition-all hover:ring-blue-500 ${
                img === mainImage
                  ? "ring-blue-600 scale-105"
                  : "ring-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );

  const checkRoomAvailability = () => {
    if (!selectedHotel) return false;

    const desiredCheckIn = new Date(checkInDate);
    const desiredCheckOut = new Date(checkOutDate);

    const availableRooms = selectedHotel.bookingstatus.filter((room) => {
      if (room.roomType.toLowerCase() !== roomType.toLowerCase()) return false;

      if (!room.bookingId) return true;

      const roomIn = new Date(room.checkIn);
      const roomOut = new Date(room.checkOut);

      return desiredCheckOut <= roomIn || desiredCheckIn >= roomOut;
    });

    return availableRooms.length >= rooms;
  };

  const handleBooking = () => {
    if (!checkRoomAvailability()) {
      alert("Sorry, not enough rooms available for your selection.");
      return;
    }
    // Proceed with booking
    handleDiscountClick();
  };

  //Call your backend /create-order,  Get the Razorpay order ID, Call new Razorpay(options).open()
  async function loadRazorpay(hotel) {
    // 1. Hit backend to get Razorpay order
    const res = await fetch("http://localhost:5000/api/orders/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelId: hotel.id,
        amount: calculateFinalPrice(),
      }),
    });

    const data = await res.json();
    const order = data.order;

    // 2. Create Razorpay options
    const options = {
      key: "rzp_test_wb29ohYja8YQoG",
      amount: order.amount,
      currency: order.currency,
      name: "Voyeger Ltd.",
      description: `Booking ${hotel.name}`,
      order_id: order.id,

      /*
        When Razorpay completes a payment, it sends back 3 things to your frontend in the handler callback:
        response.razorpay_order_id
        response.razorpay_payment_id
        response.razorpay_signature
      */

      //if payment succeds this is called by razorpay
      handler: async function (response) {
        // 3. Verify the payment
        const verifyRes = await fetch(
          "http://localhost:5000/api/orders/verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          }
        );

        const verifyData = await verifyRes.json();

        if (verifyData.status === "ok") {
          alert("✅ Payment successful!");
        } else {
          alert("❌ Payment failed verification.");
        }
      },
      theme: { color: "#000" },
    };

    const rzp = new Razorpay(options);
    rzp.open();
  }

  return (
    <div className="bg-blue-50 min-h-screen mt-10 p-10">
      <div className="container mx-auto py-6 space-y-8">
        <header className="space-y-2 text-center">
          <h1 className="h-12 flex items-center justify-center rounded-xl bg-blue-800 text-3xl font-bold tracking-tight text-white shadow-md">
            Find Your Perfect Stay
          </h1>
          <p className="rounded-lg bg-blue-200 py-2 text-black">
            Search for hotels, compare prices, and book your ideal
            accommodation.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <aside className="space-y-6">
            <div className="space-y-4 rounded-lg border bg-white p-4 shadow-sm">
              <div className="space-y-2">
                <h3 className="font-medium">Search</h3>
                <input
                  type="search"
                  placeholder="Destination, hotel name..."
                  className="w-full rounded-md border px-3 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Check‑in / Check‑out</h3>
                <div className="grid gap-2">
                  <input
                    type="date"
                    className="w-full rounded-md border px-3 py-2"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                  />
                  <input
                    type="date"
                    className="w-full rounded-md border px-3 py-2"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Room Type</h3>
                <select
                  className="w-full rounded-md border px-3 py-2"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                >
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                </select>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Rooms Required</h3>
                <select
                  className="w-full rounded-md border px-3 py-2"
                  value={sidebarRooms || 1}
                  onChange={(e) => setSidebarRooms(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "Room" : "Rooms"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Price Range</h3>
                  <span className="text-sm text-gray-500">
                    Rs{priceRange[0]} - Rs{priceRange[1]}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([
                      priceRange[0],
                      Number.parseInt(e.target.value),
                    ])
                  }
                  className="w-full"
                />
                <input
                  type="range"
                  min="100"
                  max="500"
                  step="10"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([
                      Number.parseInt(e.target.value),
                      priceRange[1],
                    ])
                  }
                  className="w-full"
                />
              </div>

              <button className="w-full rounded-md bg-blue-600 py-2 px-4 font-medium text-white hover:bg-blue-700">
                Apply Filters
              </button>
            </div>
          </aside>

          <main className="space-y-6">
            {selectedHotel ? (
              <section className="space-y-6">
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
                  <div className="flex items-center justify-between border-b p-4">
                    <button
                      onClick={handleBackToResults}
                      className="text-blue-600 hover:underline"
                    >
                      ← Back to results
                    </button>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      ⭐ {selectedHotel.rating}
                    </div>
                  </div>

                  <div className="space-y-1 p-4">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {selectedHotel.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedHotel.location}</span>
                      <a
                        href={getGoogleMapsLink(selectedHotel)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        (View on Map)
                      </a>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <ImageAlbum hotel={selectedHotel} />
                  </div>

                  <div className="space-y-4 p-4">
                    <div>
                      <label className="block text-sm font-medium">
                        Room Type
                      </label>
                      <select
                        className="mt-1 w-full rounded-md border p-2"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                      >
                        {selectedHotel.roomTypes.map((rt) => {
                          const matchingRooms =
                            selectedHotel.bookingstatus.filter((room) => {
                              if (
                                room.roomType.toLowerCase() !==
                                rt.type.toLowerCase()
                              )
                                return false;

                              if (!room.bookingId) return true;

                              const roomIn = new Date(room.checkIn);
                              const roomOut = new Date(room.checkOut);
                              const desiredCheckInDate = new Date(checkInDate);
                              const desiredCheckOutDate = new Date(
                                checkOutDate
                              );

                              const noOverlap =
                                desiredCheckOutDate <= roomIn ||
                                desiredCheckInDate >= roomOut;

                              console.log(`\nRoom ID: ${room.roomId}`);
                              console.log(`Room Type: ${room.roomType}`);
                              console.log(
                                `Booking Range: ${room.checkIn} → ${room.checkOut}`
                              );
                              console.log(
                                `Desired Range: ${checkInDate} → ${checkOutDate}`
                              );
                              console.log(
                                `Overlaps: ${!(
                                  desiredCheckOutDate <= roomIn ||
                                  desiredCheckInDate >= roomOut
                                )}`
                              );

                              return noOverlap;
                            });

                          const roomsLeft = matchingRooms.length;

                          return (
                            <option key={rt.type} value={rt.type}>
                              {rt.type} (Rs{rt.price}/night) - {roomsLeft} room
                              {roomsLeft === 1 ? "" : "s"} left
                            </option>
                          );
                        })}
                      </select>
                    </div>

                    {selectedHotel.roomTypes.find(
                      (rt) => rt.type.toLowerCase() === roomType.toLowerCase()
                    )?.available <= 2 && (
                      <div className="text-red-500 text-sm">
                        ⚠️ Only a few rooms left at this rate!
                      </div>
                    )}

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block font-medium">
                          Check‑in
                        </label>
                        <input
                          type="date"
                          className="w-full rounded-md border px-3 py-2"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block font-medium">
                          Check‑out
                        </label>
                        <input
                          type="date"
                          className="w-full rounded-md border px-3 py-2"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-1 block font-medium">
                        Number of Rooms
                      </label>
                      {(() => {
                        const matchingRooms =
                          selectedHotel.bookingstatus.filter((room) => {
                            if (
                              room.roomType.toLowerCase() !==
                              roomType.toLowerCase()
                            )
                              return false;

                            if (!room.bookingId) return true;

                            const roomIn = new Date(room.checkIn);
                            const roomOut = new Date(room.checkOut);
                            const desiredCheckInDate = new Date(checkInDate);
                            const desiredCheckOutDate = new Date(checkOutDate);

                            const noOverlap =
                              desiredCheckOutDate <= roomIn ||
                              desiredCheckInDate >= roomOut;

                            return noOverlap;
                          });

                        const availableCount = matchingRooms.length;
                        const maxOptions = Math.min(availableCount, 5); // limit dropdown to max 5

                        return (
                          <select
                            className="w-full rounded-md border px-3 py-2"
                            value={rooms}
                            onChange={(e) => setRooms(Number(e.target.value))}
                          >
                            {Array.from(
                              { length: maxOptions },
                              (_, i) => i + 1
                            ).map((n) => (
                              <option key={n} value={n}>
                                {n} {n === 1 ? "Room" : "Rooms"}
                              </option>
                            ))}
                          </select>
                        );
                      })()}
                    </div>

                    <div>
                      <label className="mb-1 block font-medium">
                        Special Requests
                      </label>
                      <textarea
                        className="min-h-[100px] w-full rounded-md border px-3 py-2"
                        placeholder="Any special requests or preferences..."
                      />
                    </div>
                  </div>

                  <div className="space-y-4 border-t bg-gray-50 p-4">
                    <h4 className="font-medium">Price Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Room rate ({roomType})</span>
                        <span>
                          Rs{getBasePrice()} × {calculateDays()} nights ×{" "}
                          {rooms} rooms
                        </span>
                      </div>
                      {discount && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount ({discount}%)</span>
                          <span>
                            -Rs
                            {Math.round(
                              calculateTotalPrice() * (discount / 100)
                            )}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Taxes & fees (12%)</span>
                        <span>
                          Rs
                          {Math.round(
                            (discount
                              ? calculateTotalPrice() * (1 - discount / 100)
                              : calculateTotalPrice()) * 0.12
                          )}
                        </span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>Rs{calculateFinalPrice()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t bg-gray-50 p-4">
                    <button
                      onClick={handleBooking}
                      disabled={!checkRoomAvailability()}
                      className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white ${
                        !checkRoomAvailability()
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      {!checkRoomAvailability()
                        ? "Not Enough Rooms Available"
                        : "Book Now"}
                    </button>
                  </div>
                </div>

                {showGameSelector && (
                  <div ref={gameSelectorRef} className="space-y-4">
                    <GameSelector
                      onDiscountWon={handleDiscountWon}
                      onBackToPackages={() => setShowGameSelector(false)}
                      discount={discount}
                      packageName={selectedHotel.name}
                    />

                    <div className="flex justify-between gap-4">
                      <button
                        className="rounded border border-gray-300 bg-white px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                        onClick={() => setShowGameSelector(false)}
                      >
                        Back to Booking
                      </button>
                      {discount && (
                        <button
                          className="rounded bg-green-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-green-700"
                          onClick={() => {
                            loadRazorpay(selectedHotel);
                            console.log(
                              "Selected Hotel Object:",
                              selectedHotel
                            );
                            // alert(`Booking completed! You saved ${discount}% on your stay.`);
                            setSelectedHotel(null);
                            setShowGameSelector(false);
                          }}
                        >
                          Finalize Booking (Rs{calculateFinalPrice()})
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </section>
            ) : (
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {filteredHotels.length} hotel
                    {filteredHotels.length !== 1 && "s"} found
                  </h2>
                  <select className="rounded-md border px-3 py-2">
                    <option value="recommended">Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredHotels.map((hotel) => (
                    <HotelCard
                      key={hotel.id}
                      hotel={hotel}
                      onBookNow={() => handleBookNow(hotel.id)}
                    />
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
