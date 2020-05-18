const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorResponse = require('../handlers/error');

module.exports = function (db) {
	let auth = {
		authEmail: function(req, res, next){
			db
				.user
				.findByEmail(req.body.email.toLowerCase())
				.then(function(user){
					if (!user) return res.status(400).send('Invalid Credentials');
					req.user = user;
					next();
				})
				.catch(err=>next(err));
		},
		authToken: function(req, res, next){
			console.log(req.cookies.serialized);
			if (req.cookies.serialized && req.cookies.serialized.isIn) {
				jwt.verify(req.cookies.serialized['x-token'], process.env.PRIVATE_KEY, (err, decoded)=>{
					if(err){
						if(err.name == "TokenExpiredError"){
							console.log('refreshing token under err');
							return auth.refreshToken(req, res, next);
						}else{
							return next(errorResponse('Could not verify user authentication', 401));
						}
					}else if (decoded){
						let decodedData = JSON.parse(decoded.data);
						console.log("decoded level 1", decoded);
						return (decodedData.id == req.cookies.serialized.serialized)
						? next()
						: res.status(401).json({
							success: false,
							msg: 'Invalid user token'
						});
					}else{
						console.log('refreshing token');
						return auth.refreshToken(req, res, next)
					}
				});
			}else{
				res.status(401).json({
					success: false,
					msg: "could not authentication user"
				});
			}		
		},
		refreshToken: function(req, res, next){
			console.log(req.cookies.serialized)
			return db.user.findByPk(req.cookies.serialized.serialized)
			.then(user=>{
				if (!user) return next(errorResponse('Unauthorize', 401));
				return user.generateToken()
		    .then(token=>{
		      return {
		        user,
		        token
		      }
		    });
			})
			.then(userToken=>{
				res.cookie('serialized', {
		      serialized: userToken.user.get('id'),
		      isIn: true,
		      'x-token': userToken.token
		    });
		    next();				
		    return userToken;
			})
			.catch(err=> {
				next(err);
			})
		}
	}
	return auth;
}