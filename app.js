const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes'); // Cart routes added
const orderRoutes = require('./routes/orderRoutes'); // Order routes added

const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to store data for products, users, cart, and orders
let products = [];
let users = [];
let cart = [];
let order = [];


// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes); // Cart route
app.use('/api/orders', orderRoutes); // Order route

app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Backend!');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});