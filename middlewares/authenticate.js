const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = function (db) {
	let auth = {
		authEmail: function(req, res, next){
			db.user.findByEmail(req.body.email.toLowerCase()).then(function(user){
				if (!user) return res.status(400).send('Invalid Credentials');
				req.user = user;
				next();
			}, function(e){
				res.status(500).send(e||null);
			});
		},
		authToken: function(req, res, next){
			console.log('cookies', req.cookies, req.cookies.serialized['x-token']);

			if (req.cookies.serialized) {
				jwt.verify(req.cookies.serialized['x-token'], process.env.PRIVATE_KEY, (err, decoded)=>{
						console.log("decoded lev 1", decoded);
					if (decoded){
						console.log("decoded", decoded);
						next();
					}else	if (req.cookies.serialized.isIn) {
						console.log(auth, 'refreshing token');
						auth.refreshToken(req, res, next)
					}else{
						res.status(401).send();
					}
				});
			}else{
				res.status(401).send();
			}		
		},
		refreshToken: function(req, res, next){
			db.user.findByPk(req.cookies.serialized.serialized)
			.then(user=>{
				if (!user) return res.status(401).send();
				console.log('refresh Token level 1')
				return user.generateToken()
		    .then(token=>{
		      return {
		        user,
		        token
		      }
		    })
			})
			.then(userToken=>{
				console.log('refresh Token level 2')
				res.cookie('serialized', {
		      serialized: userToken.user.get('id'),
		      isIn: true,
		      'x-token': userToken.token
		    })
				next()
			})
			.catch(e=> res.status(401).send());
		}
	}

	return auth;
}