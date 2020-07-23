const { errorResponse, asyncHandler } = require("../handlers/index");

module.exports = function (db) {
  return {
    name: "institution",
    getAll: asyncHandler(async (req, res, next) => {
      let institutions = await db.institution.findAll();
      res.json({
        success: true,
        data: institutions,
      });
    }),

    getSingle: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let institution = await db.findByPk(req.params.id);
      if (!institution) return next(errorResponse("Invalid request", 400));
      res.json({
        success: true,
        data: institution.toJSON(),
      });
    }),

    create: asyncHandler(async (req, res, next) => {
      let institution = await req.user.createinstitution(req.body);
      res.json({
        success: true,
        data: institution.toJSON(),
      });
    }),

    update: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let institution = await db.findByPk(req.params.id);
      let institutionUpdate = await institution.update(body);

      res.json({
        success: true,
        data: institutionUpdate.toJSON(),
      });
    }),

    remove: asyncHandler(async (req, res, next) => {
      let { body } = req;
      let institution = await db.findByPk(req.params.id);
      let institutionDelete = await institution.delete();

      res.json({
        success: true,
        data: institutionDelete.toJSON(),
      });
    }),
  };
};
