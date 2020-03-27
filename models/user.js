const bcrypt = require('bcrypt');

// set fullname column

module.exports = function (sequelize, DataType) {
	let _valitade  = {
		len: [3, 30]
	}
	let user = sequelize.define('user', {
		firstname: {
			type: DataType.STRING,
			allowNull: false,
			valitade: _valitade
		},
		lastname: {
			type: DataType.STRING,
			allowNull: false,
		},
		otherNames: {
			type: DataType.STRING,
			allowNull: true,
			defaultValue: '',
			valitade: _valitade
		},
		email: {
			type: DataType.STRING,
			allowNull: false,
			unique: true,
			valitade: {
				isEmail: true
			}
		},
		course: {
			type: DataType.STRING,
			allowNull: false,
			valitade: _valitade
		},
		duration: {
			type: DataType.STRING,
			allowNull: false
		},
		regNo: {
			type: DataType.STRING,
			allowNull: false,
			unique: true,
		},
		completed: {
			type: DataType.BOOLEAN,
			defaultValue : false
		},
		dateCompleted: {
			type: DataType.DATE,
			allowNull: true
		}
	},
	{
		hooks: {
			beforeValidate: function(user, option){
				if(user.email){
					user.email = user.email.toLowerCase().trim();
				}
			}
		}
	});

	user.createRegKey = function(req){
		return new Promise(function(resolve, reject){
			try{
				let minor = !!Math.round(Math.random()) ? 'a' : 'b';
				req.body.regNo = bcrypt.genSaltSync(10, minor);
				resolve();
			}catch(e){
				reject(e);
			}
		});
	}

	return user;
}