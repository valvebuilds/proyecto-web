const dotenv = require('dotenv');

dotenv.config();

//Ejemplos de como luciría el archivo .env con todas las variables de entorno
module.exports = {
    PORT: '3000',

    // Configuración de la base de datos
    DB_NAME: 'adminproject',
    DB_USER: 'postgres',
    DB_PASSWORD: 'root',
    DB_HOST: 'localhost',
    DB_PORT: 5432,
    JWT_SECRET: ''
}