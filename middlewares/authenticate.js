module.exports = function (db) {
	return {
		authEmail: function(req, res, next){
			db.user.findByEmail(req.body.email).then(function(user){
				req.user = user;
				next();
			}, function(e){
				res.status(500).send(e||null);
			});
		}
	}
}