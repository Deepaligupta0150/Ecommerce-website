const express = require("express");
const router = express.Router();

let cart = []; // In-memory cart (server restart hone par data reset ho jayega)

// Add item to cart
router.post("/add", (req, res) => {
    const { productId, name, price, quantity } = req.body;
    const item = { productId, name, price, quantity };
    cart.push(item);
    res.json({ message: "Item added to cart", cart });
});

// Get all cart items
router.get("/", (req, res) => {
    res.json(cart);
});

// Remove item from cart
router.delete("/remove/:productId", (req, res) => {
    const { productId } = req.params;
    cart = cart.filter(item => item.productId !== productId);
    res.json({ message: "Item removed", cart });
});

// Clear cart
router.delete("/clear", (req, res) => {
    cart = [];
    res.json({ message: "Cart cleared" });
});

module.exports = router;
