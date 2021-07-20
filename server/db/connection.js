const enviroment = process.env.NODE_ENV || "development";
const knex = require("knex");

const config = require("../knexfile");

const enviromentConfig = config[enviroment];
const connection = knex(enviromentConfig);

module.exports = connection;
