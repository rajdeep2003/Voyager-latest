const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/,"Please enter a valid 10-digit phone number"],
    },
    role: {
        type: String,
        enum: ["Admin", "User"]
    },
    token: {
        type: String
    },
    avatarUrl : {
        type: String
    }
    ,
    review: [
        {
            type:Number
        }
    ],
    points:{
        type:Number,
        required:true
    } 
})
const User = mongoose.model("user", userSchema);

module.exports = {
    User
}