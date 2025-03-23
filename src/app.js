const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ; //Puerto para ejecutar el servidor
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');

app.listen(PORT, function () {
    console.log("Servidor funcionando correctamente");

});
app.use('/api', userRoutes);
app.use('/api', projectRoutes);
module.exports = app;


