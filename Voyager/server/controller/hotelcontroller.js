const Hotel = require("../models/HotelSchema");
const Place = require("../models/PlacesSchema");
const cloudinary = require("cloudinary");

async function uploadFileToCloudinary(file, folder) {
  const options = { folder, resource_type: "auto" };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

function safeJSONParse(input, fallback = null) {
  try {
    return JSON.parse(input);
  } catch {
    return fallback;
  }
}

exports.createHotel = async (req, res) => {
  try {
    const {
      place,
      name,
      city,
      streetName,
      price,
      rating,
      amenities,
      description,
      duration,
      people,
      roomTypes,
    } = req.body;

    if (!place || !name || !price) {
      return res.status(400).json({ success: false, message: "Missing required fields: place, name, or price." });
    }

    const address = { city, streetName };
    const parsedAmenities = amenities ? safeJSONParse(amenities, []) : [];
    const parsedRoomTypes = roomTypes ? safeJSONParse(roomTypes, []) : [];

    const HotelImages = req.files?.imageFile;
    if (!HotelImages) {
      return res.status(400).json({ success: false, message: "Please provide at least one image file." });
    }

    const supportedTypes = ["jpg", "jpeg", "png", "avif"];
    const filesArray = Array.isArray(HotelImages) ? HotelImages : [HotelImages];

    const uploadedGallery = [];
    for (const file of filesArray) {
      const fileType = file.name.split(".").pop().toLowerCase();
      if (!supportedTypes.includes(fileType)) {
        return res.status(400).json({ success: false, message: `File type ${fileType} is not supported.` });
      }
      const response = await uploadFileToCloudinary(file, "VOYAGER_Hotel_FOLDER");
      uploadedGallery.push(response.secure_url);
    }

    const newHotel = await Hotel.create({
      place,
      name,
      owner: req.user.id,
      address,
      price,
      rating,
      images: uploadedGallery,
      amenities: parsedAmenities,
      description,
      duration,
      people,
      roomTypes: parsedRoomTypes,
    });

    await Place.findByIdAndUpdate(place, { $push: { hotels: newHotel._id } });

    res.status(201).json({ success: true, data: newHotel });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

exports.getOwnerHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({ owner: req.user.id }).populate("place");
    res.status(200).json({ success: true, data: hotels });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

exports.getSingleHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id, owner: req.user.id }).populate("place");
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found." });
    }
    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id, owner: req.user.id });
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found or unauthorized." });
    }
    Object.assign(hotel, req.body);
    await hotel.save();
    res.status(200).json({ success: true, data: hotel });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found or unauthorized." });
    }
    await Place.findByIdAndUpdate(hotel.place, { $pull: { hotels: hotel._id } });
    res.status(200).json({ success: true, message: "Hotel deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};
