
const express = require("express");
const router = express.Router();

const superAdminCont = require("../controllers/superAdminCont");

router.get("/create-hospital", superAdminCont.create_hospital);
router.get("/view-hospitals", superAdminCont.view_hospitals);

module.exports = router;