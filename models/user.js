const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
		regNo: {
			type: DataType.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataType.VIRTUAL,
			allowNull: false,
			valitade: {
				len: [6, 100]
			},
			set: function(value){
				console.log("value", value);
				let salt = bcrypt.genSaltSync(10);
				let hash = bcrypt.hashSync(value, salt);
				this.setDataValue('password', value);
				this.setDataValue('salt', salt);
				this.setDataValue('hash', hash);
			}
		},
		salt: {
			type: DataType.STRING
		},
		hash: {
			type: DataType.STRING
		},
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

	user.prototype.getFullname = function() {
		return `${this.firstname} ${this.lastname}`;
	};

	user.prototype.generateToken = function() {
		const self = this;
		return new Promise(function(resolve, reject){
			const payload = JSON.stringify(self.toPublicJSON());
			jwt.sign({data: payload}, process.env.PRIVATE_KEY, {expiresIn: '10s'}, (err, token)=>{
				if(err) return reject(err);
				resolve(token);
			});
		})
	};

	user.prototype.toPublicJSON = function(){
		return {
	    id: this.id,
	    firstname: this.firstname,
	    lastname: this.lastname,
	    otherNames: this.otherNames,
	    email: this.email,
	    regNo: this.regNo
    }
	}

	user.createRegKey = function(req){
		return new Promise(function(resolve, reject){
			let info = {...req.body};
			bcrypt.genSalt(10).then(s=>{
				bcrypt.hash(info.email+info.password, s)
				.then(result=>{
					let _regNo = result.split('').reverse().join('').replace(/[-|?|\|/|.]/g,'');
					req.body.regNo = _regNo;
					resolve(_regNo);
				})
				.catch(err=>{
					reject(err);
				});
			})
			.catch(err=>{
				reject(err);
			});
		});
	}

	user.findByEmail = function(email){
		return new Promise(function(resolve, reject){
			user.findOne({
				where:{
					email: email
				}}).then(function(user){
				if (user) return resolve(user);
				reject();
			}, function(err){
				reject(err);
			});
		});
	}

	return user;
}