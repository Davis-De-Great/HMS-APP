
const Hospital = require("../models/hospitalModel");
const {errorHandler} = require("../helpers/errorHandler");

const jwt = require('jsonwebtoken');

module.exports = {
    sign_Up: async(req,res) =>{
        let {hospital_name, email, phone_no, address, city, state, website, password, confirm_pass} = req.body;

        let regexName = /^[a-zA-Z0-9-]{1,100}$/;
        let regexEmail =  /(^[a-zA-Z0-9\.]{2,20})+@([\w-]+\.)+[\w-]{1,3}$/;
        let regexPhoneNo =  /(^(\+[0-9]{1,3}|0)[0-9]{3}( ){0,1}[0-9]{7,8}){1,11}\b/;
        let regexPassword = /^([a-zA-Z0-9\@%$#&*?<>+=_\-*^!`~:;"',.]{6,})$/;

        if (hospital_name.length < 1) {
            return res.status(401).json({error: "Provide hospital name"});
        }
        if (!regexName.test(hospital_name)) {
            return res.status(401).json({error: "Hospital name is too long"});
        }

        if (email.length < 1) {
            return res.status(403).json({error: "Email address is required"});
        }
        if (!regexEmail.test(email)) {
            return res.status(401).json({error: "Invalid email address"});
        }

        if (phone_no.length < 1) {
            return res.status(403).json({error: "Phone number is required"});
        }
        if (!regexPhoneNo.test(phone_no)){
            return res.status(403).json({error: "Invalid phone number"});
        }

        if (address.length < 1 || address.length > 100) {
            return res.status(401).json({error: "Address is required and shouldn't be too long"}); 
        }

        if (city.length < 1 || city.length > 100) {
            return res.status(401).json({error: "City is required and shouldn't be too long"}); 
        }
    
        if (state.length < 1 || state.length > 100) {
            return res.status(401).json({error: "State is required and shouldn't be too long"}); 
        }

        if (password.length < 1) {
            return res.status(403).json({error: "Password is required"});
        }
        if (!regexPassword.test(password)) {
            return res.status(401).json({error: "Invalid password"});
        }

        if (confirm_pass !== password) {
            return res.status(403).json({error: "Password mismatch"});
        }

        try {
            const _hospital = Hospital.create({
                hospital_name, 
                email, 
                phone_no, 
                address, 
                city, 
                state, 
                website,
                password
            })
            const token = jwt.sign({encod: _hospital._id}, process.env.SECRETE_KEY, {expiresIn: 60*60*24*1000});
            console.log(token)

            res.cookie('token', token, 60*60*24*1000);
            
            // console.log("New hospital has registered: ", hospital)
            return res.status(200).json({success: 'Account created successfully'});
    
            }catch (err) {
               let error = errorHandler(err);
               console.log(error)
               return res.status(200).json({error});
            }
    },

    // Login 
    login: async (req,res)=>{
        let {email, password} = req.body;

        let regexAB = /(^[a-zA-Z0-9\.]{2,20})+@([\w-]+\.)+[\w-]{1,3}$/;
        let regexPassword = /^([a-zA-Z0-9\@%$#&*?<>+=_\-*^!`~:;"',.]{6,})$/;

        if (email<1) {
            return res.status(401).json({error: "Email shouldn't be empty"});
        }
        if (!regexAB.test(email)) {
            return res.status(401).json({error: "Invalid email address"});
        }

        if (password.length<1) {
            return res.status(401).json({error: "Enter your password"});
        }
        if (!regexPassword.test(password)) {
            return res.status(401).json({error: "Incorrect password!"});
        }

        try {
            const H = await Hospital.login(email, password);
            // console.log(H);
            const token = jwt.sign({encod: H._id}, process.env.SECRETE_KEY, {expiresIn: 60*60*24*1000});
            console.log(token)

            res.cookie('token', token, 60*60*24*1000);
            
            return res.status(200).json({Success: "Login successfull"});
        } catch (err) {
            let error = errorHandler(err);
            console.log(error);
            return res.status(401).json({error});
        }        
       
    }

}