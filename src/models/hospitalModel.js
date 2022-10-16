const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
    hospital_name:{
        type: String
    },

    email:{
        type: String,
        unique: true
    },

    phone_no:{
        type: String,
        unique: true
    },

    address:{
        type: String
    },

    city:{
        type: String
    },

    state:{
        state: String
    },

    website:{
        type: String,
        unique: true
    },

    password:{
        type: String
    },

    Date:{
        type: Date,
        default: Date.now
    },

    role:{
        type: String,
        default: 'hospital'
    }
})

const hospitalModel = mongoose.model("hospital", hospitalSchema);
module.exports = hospitalModel;
