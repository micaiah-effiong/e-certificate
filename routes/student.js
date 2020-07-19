const express = require("express");
const courseOfferedRoute = require("./student-course");
const {
  student: { getAll, getSingle, update, remove },
} = require("../controllers/index");

const router = express.Router();
router.use("/course", courseOfferedRoute);

router.route("/").get(getAll);
router.route("/:id").get(getSingle).put(update).delete(remove);

module.exports = router;
