const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose"); 
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const router = require("./routes/authroute");
const hotelRouter = require("./routes/hotelroute");
const orderRouter = require("./routes/orderRoute");
const fileUpload = require('express-fileupload');
const { connectClodinary } = require("./config/cloudinary");
dotenv.config();
connectDB();
connectClodinary();
const app = express();

app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(cookieParser());
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true,
}));

app.get('/' , (req , res ) => {
    res.send('this is the default route ')
})
app.use("/api/users", router);
app.use("/api/hotels", hotelRouter);
app.use("/api/orders", orderRouter);
 
app.listen(5000, () => console.log("Server running on port 5000"));
