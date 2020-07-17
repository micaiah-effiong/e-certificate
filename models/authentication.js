const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataType) {
  let model = sequelize.define(
    "authentication",
    {
      password: {
        type: DataType.VIRTUAL,
        allowNull: false,
        valitade: {
          len: [6, 100],
        },
      },
      salt: {
        type: DataType.STRING,
      },
      hash: {
        type: DataType.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: async function (authentication, option) {
          const { password: _password } = authentication;
          let salt = await bcrypt.genSalt(10);
          let hash = await bcrypt.hash(_password, salt);
          authentication.setDataValue("password", _password);
          authentication.setDataValue("salt", salt);
          authentication.setDataValue("hash", hash);
        },
      },
    }
  );

  return model;
};
