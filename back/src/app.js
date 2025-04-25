const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ; //Puerto para ejecutar el servidor
const userRoutes = require('./routes/user.routes');
const projectRoutes = require('./routes/project.routes');
const authRoutes = require('./routes/auth.routes');
const cors = require('cors');

app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }));
app.options('*', cors()); 

app.use('/api/v1/auth', authRoutes); 
app.use('/api', userRoutes);
app.use('/api', projectRoutes);


module.exports = app;


