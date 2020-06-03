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
		gender: {
			type: DataType.ENUM,
			values: ['M','F'],
			allowNull: false
		},
		email: {
			type: DataType.STRING,
			allowNull: false,
			unique: true,
			valitade: {
				isEmail: true
			}
		},
		role: {
			type: DataType.STRING,
			allowNull: true,
			defaultValue: 'user'
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
				if (user.firstname) {
					user.firstname = toSentenceCase(user.firstname);
				}
				if (user.lastname) {
					user.lastname = toSentenceCase(user.lastname);
				}
				if (user.otherNames) {
					user.otherNames = toSentenceCase(user.otherNames);
				}
			}
		}
	});

	// instance methods
	user.prototype.getFullName = function() {
		return `${this.firstname} ${this.lastname}`;
	};

	user.prototype.generateToken = function() {
		const self = this;
		return new Promise(function(resolve, reject){
			const payload = JSON.stringify(self.toPublicJSON());
			jwt.sign(
			{data: payload},
			process.env.PRIVATE_KEY, {expiresIn: '10s'},
			(err, token)=>{
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

	// class methods
	user.createRegKey = function(req){
		return new Promise(function(resolve, reject){
			let info = {...req.body};
			bcrypt.genSalt(10)
				.then(s=>{
					return bcrypt.hash(info.email+info.password, s);
				})
				.then(result=>{
					let _regNo = result.split('').reverse().join('').replace(/[-|?|\|/|.]/g,'');
					req.body.regNo = _regNo;
					resolve(_regNo);
				})
				.catch(err=>{
					reject(err);
				});
		});
	}

	user.findByEmail = function(email){
		return new Promise(function(resolve, reject){
			user.findOne({where:{ email }})
				.then(user=>{
					if (!user) return reject();
					resolve(user);
				})
				.catch(err=>reject(err));
		});
	}

	return user;
}

function toSentenceCase(word){
	return word
		.trim()
		.split('')
		.map((e,a)=>(a==0)?e.toUpperCase():e.toLowerCase())
		.join('');
}