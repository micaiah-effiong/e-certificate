const express = require("express");
const path = require("path");
const {
  course: { getAllCourses, createCourse, updateCourse, deleteCourse },
} = require("../controllers/index");
const router = express.Router();
router.use((req, res, next) => {
  console.log(req.user.__proto__);
  next();
});

router.route("/").get(getAllCourses).post(createCourse);
router.route("/:id").put(updateCourse).delete(deleteCourse);

// admins only
// put
/*router
  .route("/completed/:userId/:courseId")
  .put(authorize("admin"), completedCourseUpdate);*/

/*router
  .route("/:userId/:courseId")
  .put(authorize("admin"), generalUpdate)
  .delete(authorize("admin"), deleteCourse);*/
module.exports = router;
