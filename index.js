const express = require('express');
const { dbConection } = require('./db/config');
const cors = require('cors');
const dotenv = require('dotenv').config();

//Crear servidor de express
const app = express();

//Db
dbConection();

//CORS
app.use(cors())

// Directorio publico
app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

//RUTAS
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
app.use('/api/favorites', require('./routes/favorites'));

//Escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`Server con port ${process.env.PORT}`)
});