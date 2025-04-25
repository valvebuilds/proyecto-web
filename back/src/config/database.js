const {Sequelize} = require('sequelize');
//Variables de entorno llamadas del .env 
const dotenv = require('dotenv');

dotenv.config();

//crea instancia de sequelize con variables de entorno
const sequelize = new Sequelize (
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false, //apaga los logs en consola de SQL
        timezone: '-05:00' // configura zona horaria
    }    
);
console.log('DB config:', {
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});  
module.exports = sequelize;