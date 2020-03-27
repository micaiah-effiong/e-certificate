const Sequelize = require('sequelize');
let db = Object.create(null);
let sequelize;

sequelize = new Sequelize(undefined, undefined, undefined,{
	dialect: 'sqlite',
	storage: `${__dirname}/../data/database.sqlite`
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = sequelize.import(__dirname+'/../models/user.js');

module.exports = db;