const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        type: String
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
});

hospitalSchema.pre('save', async function(){
    let _salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, _salt);
});   

// Login static method
hospitalSchema.statics.login = async function(email, password) {

    // Get data from the db
    const _h = await this.findOne({email});
    console.log(_h)

    if (_h) {
        const auth = await bcrypt.compare(password, _h.password);
        // console.log(auth)

        if (auth) {
            return _h;
        }
        throw Error('Incorrect login details');
    }
    throw Error('Incorrect login details');
}

const hospitalModel = mongoose.model("hospital", hospitalSchema);
module.exports = hospitalModel;
