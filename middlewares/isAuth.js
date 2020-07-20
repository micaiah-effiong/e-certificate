const { errorResponse } = require("../handlers/index");

module.exports = function (req, res, next) {
  if (!req.isAuthenticated())
    return next(errorResponse("User is not authenticated", 401));
  next();
};
