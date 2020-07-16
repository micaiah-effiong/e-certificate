const { errorResponse } = require("../handlers/index");

module.exports = (db) => {
	function getCompletedCourse(req, res, next, queryObj) {
		db.user
			.findOne({
				where: queryObj,
			})
			.then((user) => {
				if (!user) return next(errorResponse("Bad request", 400));
				req._user = user;
				return user.getCourses();
			})
			.then((courses) => {
				if (!courses) return next(errorResponse("Bad request", 400));
				req._completedCourse = courses.filter(
					(course) => course.toJSON().completed
				);
				next();
			})
			.catch((err) => next(err));
	}

	return {
		name: "userDetails",
		completedCourse: function (req, res, next) {
			if (!(req.query.email || req.body.email)) {
				return res.status(400).json({ error: "Bad request" });
			}

			let email = req.query.email || req.body.email;
			getCompletedCourse(req, res, next, { email });
		},
		verifyCert: function (req, res, next) {
			if (!(req.query.key || req.body.key)) {
				return res.status(400).json({ error: "invalid request" });
			}

			let id = req.query.key || req.body.key;
			getCompletedCourse(req, res, next, { regNo: id });
		},
	};
};
