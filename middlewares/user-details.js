module.exports = function (db) {
	return {
		completedCourse: function(req, res, next){
			db.user.findOne({
				where: {
					regNo: req.query.key || req.body.key,
					completed: true
				}
			}).then(function(user){
				if (user) return req.user = user.toJSON();
				res.status(404).send();
			}, function(){
				res.status(500).send();
			});
		},
	}
}