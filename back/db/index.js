require('dotenv').config();

const Sequelize = require("sequelize");
const {HOST_NAME, DB_NAME} = process.env;

const db = new Sequelize(`postgres://${HOST_NAME}/${DB_NAME}`, {
  logging: false,
});

module.exports = db;