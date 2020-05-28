module.exports = function (db) {
	function getCompletedCourse(req, res, next, queryObj){
		db.user.findOne({
			where: queryObj
		}).then(function(user){
			if (!user) return res.status(404).send();
				user.getCourses().then(function(courses){
					if (!courses) return res.status(404).send(e);
					req._user = user;
					req._completedCourse = courses.map(course=>{
						if(course.toJSON().completed){
							return course.toJSON();
						}
					});
					next();
				}, function(e){
					return e;
				});
		}, function(e){
			res.status(500).send(e);
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