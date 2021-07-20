const express = require("express");

const queries = require("../db/queries");

const router = express.Router();

// GET /api/products/
router.get("/", async (req, res) => {
  const products = await queries.getAll();
  res.json(products);
});

router.get("/:id", async (req, res, next) => {
  if (isNaN(req.params.id)) {
    return next(new Error("Invalid Id"));
  }

  const product = await queries.getOne(req.params.id);

  if (!product) {
    return next(new Error(`Not Found Product With Id ${req.params.id}`));
  }

  res.json(product);
});

module.exports = router;
