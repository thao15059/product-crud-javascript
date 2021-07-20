const express = require("express");

const queries = require("../db/queries");

const router = express.Router();

// GET /api/products/
router.get("/", async (req, res) => {
  const products = await queries.getAll();
  res.json(products);
});

// GET /api/products/:id
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

// POST /api/products/
router.post("/", async (req, res, next) => {
  if (!validProduct(req.body)) {
    return next(new Error("Invalid Product"));
  }

  const { title, description, price, quantity, image } = req.body;

  const product = {
    title,
    description,
    price,
    quantity,
    image,
  };

  const id = await queries.create(product);

  res.json({ id });
});

const validProduct = (product) => {
  return (
    typeof product.title === "string" &&
    product.title.trim() !== "" &&
    !isNaN(product.price) &&
    product.price > 0 &&
    Number.isInteger(product.quantity) &&
    product.quantity > 0
  );
};

module.exports = router;
