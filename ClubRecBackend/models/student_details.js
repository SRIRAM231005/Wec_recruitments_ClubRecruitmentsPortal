const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    clubName:{
        type:String,
    },
    clubSigs:[{
        clubSigName:{
            type:String,
        },
        studentList:[[{
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true,
            }
        }]]
    }],
    description:{
        type:String,
    }
},{timestamps: true});

const regDetails = mongoose.model("regdetail", UserSchema);

module.exports = regDetails