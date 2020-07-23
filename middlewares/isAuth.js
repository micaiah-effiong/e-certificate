const { errorResponse } = require("../handlers/index");

const isAuth = (req, res, next) => {
  if (!req.isAuthenticated())
    return next(errorResponse("User is not authenticated", 401));
  next();
};

module.exports = () => isAuth;
