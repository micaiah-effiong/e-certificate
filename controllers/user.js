const db = require("../models/index");
const stuDetails = require("../middlewares/user-details")(db);
const { errorResponse, asyncHandler } = require("../handlers/index");

module.exports = function (db) {
  return {
    name: "user",

    getAllUsers: asyncHandler(async (req, res, next) => {
      let users = await db.user.findAll();
      return res.json({
        success: true,
        data: users,
        count: users.length,
      });
    }),

    getSingleUser: asyncHandler(async (req, res, next) => {
      let id = parseInt(req.params.id);
      let user = await db.user.findByPk(id);
      if (!user) return next(errorResponse("user not found", 400));
      return res.json({
        success: true,
        data: user.toJSON(),
      });
    }),

    userProfile: (req, res, next) => {
      res.json({
        success: true,
        data: req.user,
      });
    },

    updateSingleUser: asyncHandler(async (req, res, next) => {
      let id = parseInt(req.params.id);
      let user = await db.user.findOne({ where: { id } });
      if (!user) return next(errorResponse("No such user", 400));
      user = await user.update(req.body);
      res.json({
        success: true,
        msg: "User has been updated",
        data: user.toJSON(),
      });
    }),

    deleteSingleUser: asyncHandler(async (req, res, next) => {
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
