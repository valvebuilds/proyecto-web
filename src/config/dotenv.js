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
    JWT_SECRET: '519d6aa567e376bc52be4fa249d65aafcd8412887e504254db3a209450cbc86b52056f1697eeb6cb4bb6ff900412e180bce98e6bfb6c439081139a59d3492143'
}