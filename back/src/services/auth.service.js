const { where } = require('sequelize');
const { ROLES } = require('../utils/constants');
const User = require ('../models/user.model');
const bcrypt = require('bcryptjs');

exports.authenticateUser = async (email, password) => {
    const user = await User.findOne({ where: { email } }); //encontrar usuario por email 
  
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
  //Se usa bcrypt.compare para poder mantener la encriptación de las password en la BD
    const isPasswordValid = await bcrypt.compare(password, user.password); //Verifica si la contraseña ingresada es válida
    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }
  
    return user;
  };

  //método para obtener el nombre de rol a partir del rol_id usando constantes de la carpeta utils

exports.getRoleNameById = (id) => {
    return Object.keys(ROLES).find(key => ROLES[key] === id);
  };