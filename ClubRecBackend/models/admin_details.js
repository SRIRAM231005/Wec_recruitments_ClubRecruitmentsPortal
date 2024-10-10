const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    preferenceOrder:{
        type:[String],
    }
},{timestamps: true});

const adminDetails = mongoose.model("admindetail", UserSchema);

module.exports = adminDetails