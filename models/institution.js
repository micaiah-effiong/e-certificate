module.exports = function (sequelize, DataType) {
  let model = sequelize.define("institution", {
    name: {
      type: DataType.STRING,
      allowNull: false,
      valitade: {
        len: [3, 30],
      },
    },
  });
  return model;
};
