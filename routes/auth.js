const express = require("express");
const path = require("path");
const {
  auth: { register, login, logout },
} = require("../controllers/index");

const { errorResponse } = require("../handlers/index");
const passport = require("../config/passport-config");
const router = express.Router();

router.get("/logout", logout);
router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);

module.exports = router;
