const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = function (sequelize, DataType) {
  let _valitade = {
    len: [3, 30],
  };
  let user = sequelize.define(
    "user",
    {
      email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        valitade: {
          isEmail: true,
        },
      },
      role: {
        type: DataType.ENUM,
        allowNull: true,
        defaultValue: "user",
        values: ["student", "institution", "admin"],
      },
    },
    {
      hooks: {
        beforeValidate: function (user, option) {
          if (user.email) {
            user.email = user.email.toLowerCase().trim();
          }
        },
      },
    }
  );

  // instance methods
  user.prototype.getFullName = function () {
    return `${this.firstname} ${this.lastname}`;
  };

  user.prototype.verifyPassword = async function (val) {
    let userAuth = await this.getAuthentication();
    return await bcrypt.compare(val, userAuth.hash);
  };

  user.prototype.generateToken = function () {
    const self = this;
    return new Promise(function (resolve, reject) {
      const payload = JSON.stringify(self.toPublicJSON());
      jwt.sign(
        { data: payload },
        process.env.PRIVATE_KEY,
        { expiresIn: "10s" },
        (err, token) => {
          if (err) return reject(err);
          resolve(token);
        }
      );
    });
  };

  user.prototype.toPublicJSON = function () {
    return {
      id: this.id,
      firstname: this.firstname,
      lastname: this.lastname,
      otherNames: this.otherNames,
      email: this.email,
      regNo: this.regNo,
    };
  };

  // class methods
  user.findByEmail = function (email) {
    return new Promise(function (resolve, reject) {
      user
        .findOne({ where: { email } })
        .then((user) => {
          if (!user) return reject();
          resolve(user);
        })
        .catch((err) => reject(err));
    });
  };

  return user;
};

function toSentenceCase(word) {
  return word
    .trim()
    .split("")
    .map((e, a) => (a == 0 ? e.toUpperCase() : e.toLowerCase()))
    .join("");
}
