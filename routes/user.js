const express = require("express");
const {
  user: { getAll, userProfile, getSingle, update, remove },
} = require("../controllers/index");

const router = express.Router();

router.route("/").get(getAll);
router.route("/profile").get(userProfile);
router.route("/:id").get(getSingle).put(update).delete(remove);

module.exports = router;
