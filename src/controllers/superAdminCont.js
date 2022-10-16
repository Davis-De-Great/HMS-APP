
const Hospital = require("../models/hospitalModel");

module.export = {
    
    create_hospital: async(req,res)=>{
        try {
            const hospital_id = req.query.hospitalId;
            const hosp = await User.findOneAndUpdate({_id: hospital_id}, {hospital: true});
            console.log(hosp);
            return res.status(200).json({hosp});
        } catch (error) {
            console.log(error);
        } 
    },

    view_hospitals: async(req,res)=>{
        try {
            const hospitals = await User.find();
            return res.status(200).json({hospitals});
        } catch (error) {
            let err = "No user found";
            return res.status(401).json({err});
        }
    }
}