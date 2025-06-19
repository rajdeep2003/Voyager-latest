const mongoose = require("mongoose");
const Place = require("../models/PlacesSchema")
const HotelOwner = require("../models/hoteloner")
const hotelSchema = new mongoose.Schema({
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
    required:true,
  },
  name: {
    type: String,
    required: true,
  },
   owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HotelOwner",
    
  },
  address: [
    {
      type:String,
      city:String,
      streetname:String
    }
  ],
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  images: [String],
  amenities: [String],
  description: String,
  duration: String,  
  people: String,   
  roomTypes: [
    {
      type: String,   
      price: Number,
      available: Number,
      total: Number,
    },
  ],
  bookingStatus: [
    {
      bookingId: String,
      roomId: String,
      roomType: String,
      userId: String,
      email: String,
      phone: String,
      checkIn: String,
      checkOut: String,
    }
  ],
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });
module.exports = mongoose.model("Hotel", hotelSchema);
