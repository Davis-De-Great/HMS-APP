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
const superAdminRout = require("./src/routes/superAdminRoute");

// Using imported modules
app.use("/api", authRoute);
app.use("/api", superAdminRout)

// DB connection
dbConnection();

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});

