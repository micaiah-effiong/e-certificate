"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user.hasOne(db.student);
db.user.hasOne(db.admin);
db.user.hasOne(db.institution);
db.user.hasOne(db.authentication);
db.student.belongsTo(db.user);
db.admin.belongsTo(db.user);
db.institution.belongsTo(db.user);
db.authentication.belongsTo(db.user);

db.institution.hasMany(db.course);
db.course.belongsTo(db.institution);

db.student.belongsToMany(db.course, { through: db.studentCourse });
db.course.belongsToMany(db.student, { through: db.studentCourse });

module.exports = db;
