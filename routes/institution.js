const express = require("express");
const {
  institution: { getAll, userProfile, getSingle, update, remove },
} = require("../controllers/index");

const router = express.Router();

router.route("/").get(getAll);
router.route("/:id").get(getSingle).put(update).delete(remove);

module.exports = router;
