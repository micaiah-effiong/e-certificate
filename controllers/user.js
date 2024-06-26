const db = require("../models/index");
const stuDetails = require("../middlewares/user-details")(db);
const {
  errorResponse,
  asyncHandler,
  toSentenceCase,
} = require("../handlers/index");

module.exports = function (db) {
  return {
    name: "user",

    getAll: asyncHandler(async (req, res, next) => {
      let users = await db.user.findAll();
      return res.json({
        success: true,
        data: users,
        count: users.length,
      });
    }),

    getSingle: asyncHandler(async (req, res, next) => {
      let id = parseInt(req.params.id);
      let user = await db.user.findByPk(id);
      if (!user) return next(errorResponse("Invalid request", 400));
      return res.json({
        success: true,
        data: user.toJSON(),
      });
    }),

    userProfile: asyncHandler(async (req, res, next) => {
      let role = toSentenceCase(req.user.role);
      let extra = await req.user[`get${role}`]();
      let user = req.user.toJSON();
      user[user.role] = extra;
      res.json({
        success: true,
        data: user,
      });
    }),

    update: asyncHandler(async (req, res, next) => {
      let id = parseInt(req.params.id);
      let user = await db.user.findOne({ where: { id } });
      if (!user) return next(errorResponse("Bad request", 400));
      user = await user.update(req.body);

      res.json({
        success: true,
        msg: "User has been updated",
        data: user.toJSON(),
      });
    }),

    remove: asyncHandler(async (req, res, next) => {
      let id = parseInt(req.params.id);
      let user = await db.user.findOne({ where: { id } });
      if (!user) return next(errorResponse("Bad request", 400));

      await db.user.destroy();
      return res.json({
        success: true,
        data: user.toJSON(),
      });
    }),
  };
};
