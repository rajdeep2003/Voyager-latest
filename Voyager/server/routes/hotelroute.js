const express = require('express');
const router = express.Router();
const { getAllHotels, getHotelById, filterHotels, checkRoomAvailability, updateRoomAvailability } = require('../controller/hotelbook');

// Get all hotels
router.get('/', getAllHotels);

// Get hotel by ID
router.get('/:id', getHotelById);

// Filter hotels
router.get('/filter/search', filterHotels);

// Check room availability
router.post('/check-availability', checkRoomAvailability);

// Update room availability
router.post('/update-availability', updateRoomAvailability);

module.exports = router; 