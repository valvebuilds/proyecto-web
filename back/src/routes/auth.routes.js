// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { getRoleNameById, authenticateUser } = require('../services/auth.service'); 

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET; //llama variable de entorno de llave secreta

//endpoint de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body; //credenciales
  try {
    const user = await authenticateUser(email, password); //llama a metodo de autenticacion
    const roleName = getRoleNameById(user.rol_id); //obtiene rol del usuario
    const payload = {
        id: user.id,
        name: user.nombre,
        email: user.email,
        rol: user.rol_id
      };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); //almacena el payload y genera token
      console.log(token);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
