
const express = require("express");
const router = express.Router();

const authCont = require("../controllers/authCont");

router.post("/auth/sign-up", authCont.sign_Up);
router.get("/login", authCont.login);


module.exports = router;