const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("underscore");

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
        defaultValue: "student",
        values: ["student", "institution", "admin"],
      },

      name: {
        type: DataType.STRING,
        allowNull: true,
      },

      firstname: {
        type: DataType.STRING,
        allowNull: true,
      },

      lastname: {
        type: DataType.STRING,
        allowNull: true,
      },

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
        beforeValidate: function (user, option) {
          if (user.email) {
            user.email = user.email.toLowerCase().trim();
          }

          if (user.role === "student") {
            if (user.firstname.length <= 0 || user.lastname.length <= 0) {
              throw Error(
                "Firstname and lastname is required for registration"
              );
            }

            user.name = null;
          } else if (user.role === "institution") {
            if (user.name.length <= 0) {
              throw Error("Name is required for registration");
            }

            user.firstname = null;
            user.lastname = null;
          }
        },

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
    const entity = this.toJSON();
    let list = Object.keys(entity)
      .filter((e) => entity[e] !== null)
      .filter((item) => !["salt", "hash"].includes(item));

    return _.pick(entity, list);
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
