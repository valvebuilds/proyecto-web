// importar configuración de la base de datos 
const sequelize = require('./src/config/database');
const app = require('./src/app');
//cargar variables de entorno
const dotenv = require('dotenv');
//importar relaciones entre tablas
require('./src/models/associations');

dotenv.config();


const PORT = process.env.PORT || 3000 ; //Puerto para ejecutar el servidor
//conecta a la base de datos con sequelize
sequelize.authenticate()
    .then(() => {
        console.log('Conectado a PostgreSQL con Sequelize')
        //corre el servidor en el puerto 3000
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        }); 
    })
    .catch(err => console.error('Error conectando a la base de datos:', err ));

sequelize.sync({force:false}).then(()=>{
    console.log('Base de datos sincronizada');
}).catch(err => {
    console.error('Error al sincronizar base de datos', err);
});