const jwt = require('jsonwebtoken');
const ROLES = require('./src/utils/constants.js');

const payload = {
    id: 1,
    nombre: 'valerie',
    rol: ROLES.ADMIN
  };

const secret = 'clave123'; // tu JWT_SECRET
const options = {
  expiresIn: '1h' // Opcional: el token expira en 1 hora
};

const token = jwt.sign(payload, secret, options);

console.log('Tu token es:', token);
