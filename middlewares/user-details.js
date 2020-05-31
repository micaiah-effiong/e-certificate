const errorResponse = require('../handlers/error');

module.exports = function (db) {
	function getCompletedCourse(req, res, next, queryObj){
		db.user.findOne({
			where: queryObj
		}).then(function(user){
			if (!user) return next(errorResponse('Bad request', 400));
				user.getCourses().then(function(courses){
					if (!courses) return next(errorResponse('Bad request', 400));
					req._user = user;
					req._completedCourse = courses.filter(course=> course.toJSON().completed)
					next();
				}, function(e){
					return e;
				});
		}, function(e){
			next(e);
		});
	}

	return {
		completedCourse: function(req, res, next){
			if (!(req.query.email || req.body.email)) {
				return res.status(400).json({error: 'Bad request'})
			}

			let email = req.query.email || req.body.email;
			getCompletedCourse(req, res, next, { email });
		},
		verifyCert: function(req, res, next){
			if (!(req.query.key || req.body.key)) {
				return res.status(400).json({error: 'invalid request'})
			}

			let id = req.query.key || req.body.key;
			getCompletedCourse(req, res, next, {regNo: id});
		}
	}
}