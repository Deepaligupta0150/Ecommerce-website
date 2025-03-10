const express = require("express");
const router = express.Router();

let orders = []; // In-memory orders

// ✅ 1️⃣ Order Place Karne Ka Route (POST)
router.post("/place", (req, res) => {
    const { items, totalAmount, customerName, address } = req.body;
    
    if (!items || !totalAmount || !customerName || !address) {
        return res.status(400).json({ message: "Missing required order fields" });
    }

    const order = {
        orderId: orders.length + 1,
        items,
        totalAmount,
        customerName,
        address,
        status: "Pending"
    };

    orders.push(order);
    res.status(201).json({ message: "Order placed successfully", order });
});

// ✅ 2️⃣ Sare Orders Get Karne Ka Route (GET)
router.get("/", (req, res) => {
    res.status(200).json(orders);
});

// ✅ 3️⃣ Specific Order Get Karne Ka Route (GET)
router.get("/:orderId", (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const order = orders.find(o => o.orderId === orderId);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
});

// ✅ 4️⃣ Order Status Update Ka Route (PUT)
router.put("/update/:orderId", (req, res) => {
    const orderId = parseInt(req.params.orderId);

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Request body is empty or invalid" });
    }

    const { status } = req.body;
    let order = orders.find(o => o.orderId === orderId);

    if (!order) {
        return res.status(404).json({ message: "Order not found" });
    }

    order.status = status || order.status;
    res.status(200).json({ message: "Order status updated", order });
});

// ✅ 5️⃣ Order Delete Karne Ka Route (DELETE)
router.delete("/delete/:orderId", (req, res) => {
    const orderId = parseInt(req.params.orderId);
    const orderIndex = orders.findIndex(o => o.orderId === orderId);

    if (orderIndex === -1) {
        return res.status(404).json({ message: "Order not found" });
    }

    orders.splice(orderIndex, 1);
    res.status(200).json({ message: "Order deleted successfully" });
});

module.exports = router;
