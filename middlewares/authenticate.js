const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorResponse = require("../handlers/error");

module.exports = (db) => {
	let auth = {
		authEmail: function (req, res, next) {
			db.user
				.findByEmail(req.body.email.toLowerCase())
				.then((user) => {
					if (!user) return next(errorResponse("Invalid Credentials", 401));
					req.user = user;
					next();
				})
				.catch((err) => next(err));
		},
		authSerial: function (req, res, next) {
			let id = req.cookies.serialized.serialized;
			db.user
				.findOne({ where: { id } })
				.then((user) => {
					if (!user) return next(errorResponse("Invalid Credentials", 401));
					req.user = user;
					next();
					return user.toPublicJSON();
				})
				.catch((err) => next(err));
		},
		authToken: function (req, res, next) {
			if (req.cookies.serialized && req.cookies.serialized.isIn) {
				jwt.verify(
					req.cookies.serialized["x-token"],
					process.env.PRIVATE_KEY,
					(err, decoded) => {
						if (err) {
							if (err.name == "TokenExpiredError") {
								return auth.refreshToken(req, res, next);
							} else {
								return next(
									errorResponse("Could not verify user authentication", 401)
								);
							}
						} else if (decoded) {
							let decodedData = JSON.parse(decoded.data);
							return decodedData.id == req.cookies.serialized.serialized
								? auth.authSerial(req, res, next)
								: next(errorResponse("Invalid user token", 401));
						} else {
							return auth.refreshToken(req, res, next);
						}
					}
				);
			} else {
				next(errorResponse("Could not authentication user", 401));
			}
		},
		refreshToken: function (req, res, next) {
			console.log("refreshing token");
			db.user
				.findByPk(req.cookies.serialized.serialized)
				.then((user) => {
					if (!user) return next(errorResponse("Unauthorize", 401));
					req.user = user;
					return user.generateToken().then((token) => {
						return {
							user,
							token,
						};
					});
				})
				.then((userToken) => {
					res.cookie("serialized", {
						serialized: userToken.user.get("id"),
						isIn: true,
						"x-token": userToken.token,
					});
					auth.authSerial(req, res, next);
					return userToken;
				})
				.catch((err) => {
					next(err);
				});
		},
		authorize: function (...role) {
			return (req, res, next) => {
				let { role } = req.user;
				if (!role.includes(role))
					return next(errorResponse("Unauthorized", 401));
				next();
			};
		},
	};
	return auth;
};
