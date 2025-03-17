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

    //en produccion se usaría process.env.JWT_SECRET
    JWT_SECRET: '17796176a91e8016aa1560f81d5089bc481a95d78acd26856e8a05939cf319c4340c947cef150b512b8f85ebbfe54f9639548628eaa27ccfb34a36bdc11547774a1f4eb1ce837300d1f19386373f5d8d080d9118249b2ba78f7ef876d512c5ba2a5ac8462cb0fbe01a701fe66c6418e655c442db4b528de2c5283ab01e6369bcc8a25ec9d21e60463379c3789d2602378697a10d264e865e2746d96446448a442053b6f16ca75e7c68918e4c8d8ba89352f9a1fa668751e983185a4562ce68eac1cf4801ca1bc0b25172a6d82ccba673bb26e118d9df87ef22d26100ac736f5b097521233a7e5f7a115ca35596d6596f2941a943375ed3ab6f63e63e7ce7d4be'
}