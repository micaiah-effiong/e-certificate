const Sequelize = require('sequelize');
let db = Object.create(null);
let sequelize;


if(process.env.NODE_ENV == "development"){
  sequelize = new Sequelize(undefined, undefined, undefined,{
  	dialect: 'sqlite',
  	storage: `${__dirname}/../data/database.sqlite`,
  	logging: false
  });
}else{
  sequelize = new Sequelize({
    // set up database connection for production
  });
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = sequelize.import(__dirname+'/../models/user.js');
db.course = sequelize.import(__dirname+'/../models/course.js');

db.user.hasMany(db.course);
db.course.belongsTo(db.user);

module.exports = db;