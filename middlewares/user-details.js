module.exports = function (db) {
	return {
		completedCourse: function(req, res, next){
			if (!(req.query.key || req.body.key)) {
				return res.status(401).json({error: 'invalid request'})
			}

			db.user.findOne({
				where: {
					regNo: req.query.key || req.body.key
				}
			}).then(function(user){
				if (!user) return res.status(404).send();
					req.user = user;
					user.getCourses().then(function(courses){
						console.log(courses.length, !courses);
						if (!courses) return res.status(401).send(e);
						req.user.completedCourse = courses.filter(a=>{
							if(a.toJSON().completed){
								return a.toJSON();
							}
						});
						next();
					}, function(e){
						return e;
					});
			}, function(e){
				res.status(500).send(e);
			});
		},
	}
}