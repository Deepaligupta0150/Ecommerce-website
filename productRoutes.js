const express = require('express');
const router = express.Router();

// ✅ In-memory storage for products
let products = [];

// ✅ GET - Fetch all products
router.get('/', (req, res) => {
  res.json(products);
});

// ✅ POST - Add a new product
router.post('/', (req, res) => {   
  const { name, description, price, stock } = req.body;
  if (!name || !description || !price || !stock) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price,
    stock
  };
  products.push(newProduct);
  res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// ✅ GET - Fetch a product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// ✅ PUT - Update a product by ID
router.put('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, description, price, stock } = req.body;
  
  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.stock = stock || product.stock;

  res.json({ message: "Product updated successfully", product });
});

// ✅ DELETE - Remove a product by ID
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }
  products.splice(index, 1);
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = router;
