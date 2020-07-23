const { errorResponse, asyncHandler } = require("../handlers/index");

module.exports = function (db) {
  return {
    name: "studentCourse",
    getAll: asyncHandler(async (req, res, next) => {
      let student = await req.user.getStudent();
      let stud_course = await student.getCourses();
      res.json({
        success: true,
        data: stud_course,
      });
    }),

    create: asyncHandler(async (req, res, next) => {
      let student = await req.user.getStudent();
      let course = await student.createCourse();
      res.json({
        success: true,
        data: course.toJSON(),
      });
    }),
  };
};
