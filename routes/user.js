const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const auth = require("../middlewares/authenticate")(db);
const stuDetails = require("../middlewares/user-details")(db);
const courseRoute = require("../routes/course");
const {
  user: {
    getAllUsers,
    userProfile,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
  },
} = require("../controllers/index");

const router = express.Router();

router.use(auth.authToken);
router.use("/course", courseRoute);

router.route("/").get(getAllUsers);

router.route("/profile").get(userProfile);

router
  .route("/:id")
  .get(getSingleUser)
  .put(updateSingleUser)
  .delete(deleteSingleUser);

module.exports = router;
