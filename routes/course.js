const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/db");
const auth = require("../middlewares/authenticate")(db);
const pdf = require("../middlewares/html-pdf");
const stuDetails = require("../middlewares/user-details")(db);
const errorResponse = require("../handlers/error");
const router = express.Router();

router.use(auth.authToken);

router.get("/", (req, res, next) => {
  req.user
    .getCourses()
    .then((userCourses) => {
      let result = [];
      if (userCourses && userCourses.length > 0) {
        result = userCourses.map((course) => {
          return course.toJSON();
        });
      }
      res.json({
        success: true,
        data: result,
      });
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  // get course name
  // add course name to ${body}
  let { body } = req;
  body.courseName = db.course.getCourseNameFromCourseCode(body.courseCode);

  // validate input
  if (!body.courseName) return next(errorResponse("Bad Request", 400));

  req.user.getCourses().then((userCourses) => {
    let result = userCourses.filter(
      (course) => course.courseName == body.courseName
    );

    // checking  for already registered course
    if (result.length > 0)
      return next(errorResponse("Course already registered", 400));

    body.email = req.user.get("email");

    req.user
      .createCourse(body)
      .then((course) => {
        res.json({
          success: true,
          data: course.toJSON(),
        });
      })
      .catch((err) => next(err));
  });
});

// admins only

// put

router.put("/completed/:userId/:courseId", (req, res, next) => {
  let { body } = req;
  let { userId, courseId } = req.params;
  db.course
    .update(
      { completed: true, dateCompleted: Date.now() },
      { where: { id: courseId } }
    )
    .then((course) => {
      res.json({
        success: true,
        data: course,
      });
    })
    .catch((err) => next(err));
});

router.put("/completed/:userId/:courseId", (req, res, next) => {
  let { body } = req;
  let { userId, courseId } = req.params;
  db.course
    .update(
      { completed: true, dateCompleted: Date.now() },
      { where: { id: courseId } }
    )
    .then((course) => {
      res.json({
        success: true,
        data: course,
      });
    })
    .catch((err) => next(err));
});

router.delete("/:userId/:courseId", (req, res, next) => {
  let { body } = req;
  let { userId, courseId } = req.params;
  db.course
    .destroy({ where: { id: courseId } })
    .then((course) => {
      res.json({
        success: true,
        data: course,
      });
    })
    .catch((err) => next(err));
});
module.exports = router;
