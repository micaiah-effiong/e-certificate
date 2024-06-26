const express = require("express");
const path = require("path");
const db = require("../models/index");
const { authToken } = require("../middlewares/authenticate")(db);
const pdf = require("../middlewares/html-pdf");
const mailer = require("../middlewares/mailer");
const stuDetails = require("../middlewares/user-details")(db);
const router = express.Router();

router.use(express.static(path.join(__dirname, "..", "public")));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "certificate.html"));
});

router.get(
  "/get",
  authToken,
  stuDetails.completedCourse,
  pdf,
  mailer,
  (req, res) => {
    res.send(req.userCertBuffer);
  }
);

/*may not be used*/
router.get(
  "/download",
  authToken,
  stuDetails.completedCourse,
  pdf,
  (req, res) => {
    res.download(req.userCertBuffer);
  }
);

router.get("/verify", stuDetails.verifyCert, (req, res) => {
  let user = req._user.toPublicJSON();
  user.fullname = req._user.getFullName();
  res.json({
    success: true,
    count: req._completedCourse.length,
    data: {
      course: req._completedCourse,
      user,
    },
  });
});

module.exports = router;
