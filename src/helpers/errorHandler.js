
const res = require("express/lib/response");

const errorHandler = (err)=>{
let errors = {email:" ", phone_no:" "};
    if (err.code === 11000){
        if (err.message.includes("email_1 dup key")){
            errors.email = "Invalid email address"
        };
        if (err.message.includes("phone_no_1 dup key")){
            errors.phone_no = "Invalid phone number"
        };
        return {errors}
    }
        
    console.log(err.message);
}

module.exports = {errorHandler};