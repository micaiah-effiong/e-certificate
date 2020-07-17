const express = require("express");

const certRoute = require("./certificate");
const usersRoute = require("./user");
const courseRoute = require("./course");

const router = express.Router();

router.use("/certificate", certRoute);
router.use("/users", usersRoute);
router.use("/courses", courseRoute);
module.exports = router;
