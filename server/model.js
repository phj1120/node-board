// DB
var { Sequelize } = require("sequelize");

global.User = sequelize.define("User", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
});

global.Board = sequelize.define("Board", {
  bno: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowVull: false,
  },
  title: {
    type: Sequelize.STRING,
  },
  body: {
    type: Sequelize.TEXT,
  },
  writer: {
    type: Sequelize.STRING,
  },
  writeTime: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  viewCnt: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

// https://sequelize.org/docs/v6/core-concepts/model-basics/#model-synchronization
sequelize.sync({
  alter: true,
});
