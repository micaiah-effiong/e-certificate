module.exports = function (sequelize, DataType) {
  let model = sequelize.define("admin", {
    firstname: {
      type: DataType.STRING,
      allowNull: false,
      valitade: {
        len: [3, 30],
      },
    },
    lastname: {
      type: DataType.STRING,
      allowNull: false,
      valitade: {
        len: [3, 30],
      },
    },
  });
  return model;
};
