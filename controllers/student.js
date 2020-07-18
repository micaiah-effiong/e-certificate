const { errorResponse, asyncHandler } = require("../handlers/index");

module.exports = function (db) {
  return {
    name: "student",
    getAll: asyncHandler(async (req, res, next) => {
      let students = await db.student.findAll();
      res.json({
        success: true,
        data: students,
      });
    }),

    getSingle: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let student = await db.findByPk(req.params.id);
      if (!student) return next(errorResponse("Invalid request", 400));
      res.json({
        success: true,
        data: student.toJSON(),
      });
    }),

    create: asyncHandler(async (req, res, next) => {
      let student = await req.user.createStudent(req.body);
      res.json({
        success: true,
        data: student.toJSON(),
      });
    }),

    update: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let student = await db.findByPk(req.params.id);
      let studentUpdate = await student.update(body);

      res.json({
        success: true,
        data: studentUpdate.toJSON(),
      });
    }),

    remove: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let student = await db.findByPk(req.params.id);
      let studentDelete = await student.delete();

      res.json({
        success: true,
        data: studentDelete.toJSON(),
      });
    }),
  };
};
