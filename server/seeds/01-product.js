const products = require("../products");

exports.seed = function (knex) {
  return knex("product")
    .del()
    .then(function () {
      return knex("product").insert(products);
    });
};
