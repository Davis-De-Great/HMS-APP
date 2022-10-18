
const Hospital = require("../models/hospitalModel");

module.exports = {
    
    create_hospital: async(req,res)=>{
        try {
            const hospital_id = req.query.hospitalId;
            const hosp = await Hospital.findOneAndUpdate({_id: hospital_id}, {role: "hospital"});
            console.log(hosp);
            return res.status(200).json({hosp});
        } catch (error) {
            console.log(error);
        } 
    },

    view_hospitals: async(req,res)=>{
        try {
            const hospitals = await Hospital.find();
            return res.status(200).json({hospitals});
        } catch (error) {
            let err = "No user found";
            return res.status(401).json({err});
        }
    }
}