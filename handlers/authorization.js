const errorResponse = require("../handlers/error");

module.export = (...role) => {
  return (req, res, next) => {
    let { userRole } = req.user;
    if (!role.includes(userRole))
      return next(errorResponse("Unauthorized", 401));
    next();
  };
};
