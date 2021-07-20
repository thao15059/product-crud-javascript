const express = require("express");

const queries = require("../db/queries");

const router = express.Router();

// GET /api/products/
router.get("/", async (req, res) => {
  const products = await queries.getAll();
  res.json(products);
});

module.exports = router;
