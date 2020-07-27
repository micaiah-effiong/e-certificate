const express = require("express");
const path = require("path");

const apiRoute = require("./api");
const authRoute = require("./auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "public/build", "index.html"));
});

router.use("/auth", authRoute);
router.use("/api", apiRoute);

module.exports = router;
