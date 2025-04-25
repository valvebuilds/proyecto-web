// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userService = require('../services/user.service');

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Intentando login con:', email, password);
  try {
    const user = await userService.authenticateUser(email, password);
    const payload = {
        id: user.id,
        email: user.email,
        rol: user.rol
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
