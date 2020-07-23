const express = require("express");
const {
  studentCourse: { getAll, create },
} = require("../controllers/index");

const router = express.Router();

router.route("/").get(getAll).post(create);

module.exports = router;
