const express = require("express");

const apiRoute = require("./api");
const authRoute = require("./auth");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/api", apiRoute);

module.exports = router;
