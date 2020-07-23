const express = require("express");
const studentRouter = require("./student");
const institutionRouter = require("./institution");
const {
  user: { getAll, userProfile, getSingle, update, remove },
} = require("../controllers/index");

const router = express.Router();
router.use("/student", studentRouter);
router.use("/institution", institutionRouter);

router.route("/").get(getAll);
router.route("/profile").get(userProfile);
router.route("/:id").get(getSingle).put(update).delete(remove);

module.exports = router;
