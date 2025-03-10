const express = require('express');
const router = express.Router();

let users = []; // In-memory storage

// 📌 Register User
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (users.find(user => user.email === email)) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const newUser = { 
    id: users.length + 1, 
    name, 
    email, 
    password 
  };
  users.push(newUser);
  
  res.status(201).json({ message: 'User registered successfully', user: newUser });
});

// 📌 Get All Users
router.get('/', (req, res) => {
  res.status(200).json(users);
});

// 📌 Get User by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id); // Ensure ID is a number
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.status(200).json(user);
});

// 📌 Update User
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[userIndex] = { id: userId, ...req.body };
  res.status(200).json({ message: 'User updated successfully', user: users[userIndex] });
});

// 📌 Delete User
router.delete('/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userExists = users.some(user => user.id === userId);

  if (!userExists) {
    return res.status(404).json({ message: 'User not found' });
  }

  users = users.filter(user => user.id !== userId);
  res.status(200).json({ message: 'User deleted successfully' });
});

// 📌 Login User
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  res.status(200).json({ message: 'Login successful', user });
});

module.exports = router;
