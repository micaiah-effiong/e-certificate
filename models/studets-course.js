module.exports = function (sequelize, DataType) {
  let model = sequelize.define("studentCourse", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    completed: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    dateCompleted: {
      type: DataType.DATE,
    },
  });
  return model;
};
