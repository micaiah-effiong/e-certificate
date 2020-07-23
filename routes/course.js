const express = require("express");
const path = require("path");
const {
  course: { getAll, getSingle, create, update, remove },
} = require("../controllers/index");

const router = express.Router();
router.use((req, res, next) => {
  next();
});

router.route("/").get(getAll).post(create);
router.route("/:id").get(getSingle).put(update).delete(remove);

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
