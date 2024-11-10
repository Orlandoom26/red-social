const mongoose = require('mongoose');
require('dotenv').config();
const db_URL = process.env.DATABASE
const name_db = process.env.NAMEDB

// const db_URL = `mongodb://127.0.0.1:27017/hazbinhotel`

module.exports = () => {
    const conexion = () => {
        mongoose.connect(db_URL + name_db)
        .then(() => console.log('Conectado a la Base de Datos ' + name_db))
        .catch(err => console.error('Error de Conexión: ' + err.stack));
    }
    conexion();
};