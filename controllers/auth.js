const _ = require("underscore");
const { errorResponse, asyncHandler, toSentenceCase } = require("../handlers");

module.exports = (db) => {
  return {
    name: "auth",

    register: asyncHandler(async (req, res, next) => {
      req.body.role = req.body.type;
      const _type = toSentenceCase(req.body.type || "student");
      let user = await db.user.create(req.body);
      await user.createAuthentication({ password: req.body.password });
      await user[`create${_type}`](req.body);
      res.json({
        success: true,
        data: user.toJSON(),
      });
    }),

    logout: asyncHandler((req, res, next) => {
      req.logout();
      res.redirect("/");
    }),

    login: asyncHandler((req, res, next) => {
      let { user } = req;
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        res.json({
          success: true,
          data: user.toJSON(),
        });
      });
    }),
  };
};
