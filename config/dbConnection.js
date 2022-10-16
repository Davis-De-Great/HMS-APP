
const mongoose = require('mongoose');

const dbConnection = ()=>{
    mongoose.connect("mongodb://localhost:27017/HMS");
        if (dbConnection) {
            console.log("connected")
        }
        else{
            console.log("Connection error");
        }
};

module.exports = dbConnection;