const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require ('../models/user.model');

const SECRET_KEY = process.env.JWT_SECRET; //LLama a la variable de entorno de nuestra llave secreta

const authenticateToken = (req, res, next) => {
    // Verificar si el encabezado 'Authorization' existe
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' });
    }

    // Verificar que el token esté en el formato correcto: 'Bearer <token>'
    const token = authHeader.split(' ')[1]; // Aquí obtenemos el token después de "Bearer"
    if (!token) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    // Verificar el token con la llave secreta
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' }); // Si el token no es válido
        }

        req.user = user; // Se guarda el payload del usuario autenticado dentro de `req.user`
        next(); // Continuar con el siguiente middleware o controlador
    });
};

//Verifica si el rol del payload coincide con el rol del parámetro (ADMIN en este caso)
const checkRole = (roles) =>{
    return (req, res, next) =>{
        const { rol } = req.user;
        if (!roles.includes(rol)){
            return res.status(403).json({message: 'Acceso denegado, no tienes permiso para realizar esta acción'});
        }
        next();
    };
};
module.exports = {authenticateToken, checkRole};