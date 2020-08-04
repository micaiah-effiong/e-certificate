const db = require("../models/index");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);
let handler = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const _filesModule = require(path.join(__dirname, file));
    handler[_filesModule.name] = _filesModule;
  });

module.exports = handler;
