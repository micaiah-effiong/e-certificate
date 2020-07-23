const bcrypt = require("bcrypt");

module.exports = function (sequelize, DataType) {
  let model = sequelize.define(
    "student",
    {
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
      gender: {
        type: DataType.ENUM,
        values: ["M", "F"],
        allowNull: false,
      },
      regNo: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      hooks: {
        beforeValidate: async function (student, options) {
          try {
            let _email = (await student.getUser()).email;
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(_email, salt);

            let key = hash
              .split("")
              .reverse()
              .join("")
              .replace(/[-|?|\|$|/|.]/g, "");
            student.regNo = key;
          } catch (err) {
            console.log(err);
          }
        },
      },
    }
  );
  return model;
};
