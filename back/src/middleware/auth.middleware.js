const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const User = require ('../models/user.model');

const SECRET_KEY = process.env.JWT_SECRET; //LLama a la variable de entorno de nuestra llave secreta

const authenticateToken = (req, res, next) => {

    try{ //Verifica que si haya un header de Autorización para extraer el token
    const token = req.header('Authorization').split(" ")[1]; //

    //verifica el token con llave secreta
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({message: 'Token no valido'}); //Mensaje en caso de fallo de verificación
        }
        req.user = user; //se guarda payload de usuario autenticado dentro del request
        next();
    });}
    catch (err){
        return res.status(401).json({ message: 'Acceso denegado, no se proporcionó un token' });
    }
};

//Verifica si el rol del payload coincide con el rol del parámetro (ADMIN en este caso)
const checkRole = (roles) =>{
    return (req, res, next) =>{
        const { rol } = req.user;
        console.log(req.user);
        if (!roles.includes(rol)){
            return res.status(403).json({message: 'Acceso denegado, no tienes permiso para realizar esta acción'});
        }
        next();
    };
};
module.exports = {authenticateToken, checkRole};