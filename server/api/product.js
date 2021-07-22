const express = require("express");

const queries = require("../db/queries");

const router = express.Router();

const validIdMid = (req, res, next) => {
  if (isNaN(req.params.id)) {
    return next(new Error("Invalid Id"));
  }

  next();
};

const validProductMid = (req, res, next) => {
  const { title, price, quantity } = req.body;
  if (
    !(
      typeof title === "string" &&
      title.trim() !== "" &&
      !isNaN(price) &&
      price > 0 &&
      Number.isInteger(quantity) &&
      quantity > 0
    )
  ) {
    return next(new Error("Invalid Product"));
  }

  next();
};

const getProductFromOdy = (body) => {
  const { title, description, price, quantity, image } = body;

  return {
    title,
    description,
    price,
    quantity,
    image,
  };
};

// GET /api/products/
router.get("/", async (req, res) => {
  const products = await queries.getAll();
  res.json(products);
});

// GET /api/products/:id
router.get("/:id", validIdMid, async (req, res, next) => {
  const product = await queries.getOne(req.params.id);

  if (!product) {
    return next(new Error(`Not Found Product With Id ${req.params.id}`));
  }

  res.json(product);
});

// POST /api/products/
router.post("/", validProductMid, async (req, res, next) => {
  const product = getProductFromOdy(req.body);

  const id = await queries.create(product);

  res.json({ id });
});

// PUT /api/products/:id
router.put("/:id", validIdMid, validProductMid, async (req, res) => {
  if (isNaN(req.params.id)) {
    return next(new Error("Invalid Id"));
  }

  const product = getProductFromOdy(req.body);

  await queries.update(req.params.id, product);

  res.json({ id: req.params.id });
});

// DELETE /api/products/:id
router.delete("/:id", validIdMid, async (req, res) => {
  await queries.delete(req.params.id);

  res.json({ message: "Deleted" });
});

module.exports = router;
