const Product = require("../models/productModel");

exports.getAllProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching products" });
    }
    res.json(results);
  });
};

exports.addProduct = (req, res) => {
  const {
    name,
    description,
    price,
    image,
    stock_quantity,
    created_at,
    updated_at,
  } = req.body;

  Product.create(
    name,
    description,
    price,
    image,
    stock_quantity,
    created_at,
    updated_at,
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error adding product" });
      }
      res
        .status(201)
        .json({
          message: "Product added successfully",
          productId: result.insertId,
        });
    }
  );
};
