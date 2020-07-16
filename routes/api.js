const express = require("express");

const certRoute = require("./certificate");
const usersRoute = require("./user");

const router = express.Router();

router.use("/certificate", certRoute);
router.use("/user", usersRoute);

module.exports = router;
