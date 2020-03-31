module.exports = function (db) {
	return {
		completedCourse: function(req, res, next){
			db.user.findOne({
				where: {
					regNo: req.query.key || req.body.key
				}
			}).then(function(user){
				if (!user) return res.status(404).send();
					req.user = user;
					user.getCourses().then(function(courses){
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