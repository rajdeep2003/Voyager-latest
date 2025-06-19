const hotels = require('../models/hoteldatalist');
const Razorpay = require('razorpay');
const crypto = require("crypto");

const instance = new Razorpay({  
    key_id: "rzp_test_wb29ohYja8YQoG",
    key_secret: "0BlelHv2GYnSWQRtR2fqDd63"
}); 

// Get all hotels
const getAllHotels = (req, res) => {
    try {
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get hotel by ID
const getHotelById = (req, res) => {
    try {
        const hotel = hotels.find(h => h.id === parseInt(req.params.id));
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }
        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Filter hotels by search query and price range
const filterHotels = (req, res) => {
    try {
        const { searchQuery, minPrice, maxPrice } = req.query;
        
        let filteredHotels = [...hotels];

        if (searchQuery) {
            filteredHotels = filteredHotels.filter(hotel => 
                hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (minPrice && maxPrice) {
            filteredHotels = filteredHotels.filter(hotel => 
                hotel.price >= parseInt(minPrice) && 
                hotel.price <= parseInt(maxPrice)
            );
        }

        res.status(200).json(filteredHotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check room availability
const checkRoomAvailability = (req, res) => {
    try {
        const { hotelId, roomType, rooms } = req.body;
        const hotel = hotels.find(h => h.id === parseInt(hotelId));
        
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const roomTypeData = hotel.roomTypes.find(rt => rt.type.toLowerCase() === roomType.toLowerCase());
        if (!roomTypeData) {
            return res.status(404).json({ message: "Room type not found" });
        }

        const isAvailable = roomTypeData.available >= parseInt(rooms);
        res.status(200).json({ 
            available: isAvailable,
            remainingRooms: roomTypeData.available
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update room availability after booking
const updateRoomAvailability = (req, res) => {
    try {
        const { hotelId, roomType, rooms } = req.body;
        const hotel = hotels.find(h => h.id === parseInt(hotelId));
        
        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const roomTypeData = hotel.roomTypes.find(rt => rt.type.toLowerCase() === roomType.toLowerCase());
        if (!roomTypeData) {
            return res.status(404).json({ message: "Room type not found" });
        }

        if (roomTypeData.available < parseInt(rooms)) {
            return res.status(400).json({ message: "Not enough rooms available" });
        }

        roomTypeData.available -= parseInt(rooms);
        res.status(200).json({ 
            message: "Room availability updated successfully",
            remainingRooms: roomTypeData.available
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Razorpay order
const createOrder = (req, res) => {
    const { hotelId, amount } = req.body;
  
    // 1. Find hotel by ID
    const hotel = hotels.find(h => h.id === parseInt(hotelId));
  
    if (!hotel) {
        return res.status(404).json({ message: "Hotel not found" });
    }
  
    const totalAmount = amount * 100; // in paise
  
    // 2. Razorpay requires amount in paise
    const options = {
        amount: totalAmount,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
    };
  
    // 3. Create Razorpay order
    instance.orders.create(options, (err, order) => {
        if (err) {
            console.error("Error creating Razorpay order", err);
            return res.status(500).send("Unable to create order");
        }
  
        // 4. Return order details to frontend
        res.json({ order, hotel });
    });
};

// Verify Razorpay payment
const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
    const hmac = crypto.createHmac("sha256", '0BlelHv2GYnSWQRtR2fqDd63');
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const digest = hmac.digest("hex");
  
    if (digest === razorpay_signature) {
        res.json({ status: "ok" });
    } else {
        res.status(400).json({ status: "invalid signature" });
    }
};

module.exports = {
    getAllHotels,
    getHotelById,
    filterHotels,
    checkRoomAvailability,
    updateRoomAvailability,
    createOrder,
    verifyPayment
}; 