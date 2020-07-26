const { errorResponse, asyncHandler } = require("../handlers/index");

module.exports = function (db) {
  return {
    name: "course",
    getAll: asyncHandler(async (req, res, next) => {
      let courses = await db.course.findAll();
      res.json({
        success: true,
        data: courses,
      });
    }),

    getSingle: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let course = await db.course.findByPk(req.params.id);
      if (!course) return next(errorResponse("Invalid request", 400));
      res.json({
        success: true,
        data: course.toJSON(),
      });
    }),

    create: asyncHandler(async (req, res, next) => {
      let institution = await req.user.getInstitution();
      let course = await institution.createCourse(req.body);
      res.json({
        success: true,
        data: course.toJSON(),
      });
    }),

    update: asyncHandler(async (req, res, next) => {
      let { body } = req;
      // get courses from user
      // loop through array and check for on with same id
      // run update
      let courses = await req.user.getCourses();
      let [course] = courses.filter((c) => c.id == req.params.id);
      let courseUpdate = await course.update(body);

      res.json({
        success: true,
        data: courseUpdate.toJSON(),
      });
    }),

    remove: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let course = await db.course.findByPk(req.params.id);
      let courseDelete = await course.delete();
      res.json({
        success: true,
        data: courseDelete.toJSON(),
      });
    }),
  };
};
