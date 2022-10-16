require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');  


const app = express();
const PORT = process.env.APP_PORT || 9000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true } ));
app.use(bodyParser.json()); 
app.use(cookieParser());


// Importing modules
const dbConnection = require("./config/dbConnection");
const authRoute = require("./src/routes/authRoute");
const superAdminCont = require("./src/routes/superAdminRoute");

// Using imported modules
app.use("/api/auth", authRoute);
app.use("/api", superAdminCont)

// DB connection
dbConnection();

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});

