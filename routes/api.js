const express = require("express");

const certRoute = require("./certificate");
const usersRoute = require("./user");
const courseRoute = require("./course");
const institutionRoute = require("./institution");
const studentRoute = require("./student");

const router = express.Router();

router.use("/certificate", certRoute);
router.use("/users", usersRoute);
router.use("/institutions", institutionRoute);
router.use("/students", studentRoute);
module.exports = router;
