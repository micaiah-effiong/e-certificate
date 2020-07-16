const db = require("../models/index");
const stuDetails = require("../middlewares/user-details")(db);
const errorResponse = require("../handlers/error");

module.exports = function (db) {
  return {
    name: "user",
    getAllUsers: (req, res, next) => {
      db.user
        .findAll()
        .then((users) => {
          if (!users)
            return res.json({
              success: true,
              data: users,
            });
          let result = users.map((user) => {
            return user.toPublicJSON();
          });
          return res.json({
            success: true,
            data: result,
            count: result.length,
          });
        })
        .catch((err) => {
          next(err);
        });
    },

    deleteSingleUser: (req, res, next) => {
      let id = parseInt(req.params.id);
      if (!(req.cookies.serialized.serialized == id)) {
        return next(errorResponse("Action not allowed", 401));
      } else {
        return db.user
          .destroy({ where: { id: id } })
          .then((user) => {
            if (!user) return next(errorResponse("user not found", 400));
            return res.json({
              success: true,
              data: user,
            });
          })
          .catch((err) => {
            next(err);
          });
      }
    },

    getAllUsers: (req, res, next) => {
      db.user
        .findAll()
        .then((users) => {
          if (!users)
            return res.json({
              success: true,
              data: users,
            });
          let result = users.map((user) => {
            return user.toPublicJSON();
          });
          return res.json({
            success: true,
            data: result,
            count: result.length,
          });
        })
        .catch((err) => {
          next(err);
        });
    },

    userProfile: (req, res, next) => {
      res.json({
        success: true,
        data: req.user.toPublicJSON(),
      });
    },

    getSingleUser: (req, res, next) => {
      let id = parseInt(req.params.id);
      return db.user
        .findByPk(id)
        .then((user) => {
          if (!user) return next(errorResponse("user not found", 400));
          return res.json({
            success: true,
            data: user.toPublicJSON(),
          });
        })
        .catch((err) => {
          next(err);
        });
    },

    updateSingleUser: (req, res, next) => {
      let id = parseInt(req.params.id);
      if (!(req.cookies.serialized.serialized == id)) {
        return next(errorResponse("Action not allowed", 401));
      } else {
        db.user
          .findOne({
            where: { id },
          })
          .then((user) => {
            if (!user) return next(errorResponse("No such user", 400));
            return user;
          })
          .then((user) => {
            return user.update(req.body);
          })
          .then((result) => {
            res.json({
              success: true,
              msg: "User has been updated",
              data: result.toPublicJSON(),
            });
          })
          .catch((err) => {
            next(err);
          });
      }
    },

    deleteSingleUser: (req, res, next) => {
      let id = parseInt(req.params.id);
      if (!(req.cookies.serialized.serialized == id)) {
        return next(errorResponse("Action not allowed", 401));
      } else {
        return db.user
          .destroy({ where: { id: id } })
          .then((user) => {
            if (!user) return next(errorResponse("user not found", 400));
            return res.json({
              success: true,
              data: user,
            });
          })
          .catch((err) => {
            next(err);
          });
      }
    },
  };
};
