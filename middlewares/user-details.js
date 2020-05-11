module.exports = function (db) {

	function getCompletedCourse(req, res, next, id){
		db.user.findOne({
			where: {
				regNo: id
			}
		}).then(function(user){
			if (!user) return res.status(404).send();
				req.user = user;
				user.getCourses().then(function(courses){
					console.log(courses.length, !courses);
					if (!courses) return res.status(404).send(e);
					req.user.completedCourse = courses.filter(course=>{
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
				return res.status(400).json({error: 'invalid request'})
			}

			let id = req.query.key || req.body.key;
			getCompletedCourse(req, res, next, id);
		},
		verifyCert: function(req, res, next){
			if (!(req.query.key || req.body.key)) {
				return res.status(400).json({error: 'invalid request'})
			}

			let id = req.query.key || req.body.key;
			getCompletedCourse(req, res, next, id);
		}
	}
}