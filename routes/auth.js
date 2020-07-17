const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models/index");
const {
  auth: { register, login, logout },
} = require("../controllers/index");
const stuDetails = require("../middlewares/user-details")(db);
const { errorResponse } = require("../handlers/index");
const passport = require("../config/passport-config");
const router = express.Router();

router.get("/logout", logout);
router.post("/register", register);
router.post("/login", passport.authenticate("local"), login);

module.exports = router;
