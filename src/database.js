const mysql = require('mysql');
const {promisify} = require('util');
const { database} = require('./keys');

const pool = mysql.createPool(database);
pool.getConnection((err,con) =>{
    if(err) {
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La Conexion se ha perdido!');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Ya existen demasiadas conexiones en el Servidor');
        }
        if(err.code === 'ENCONNREFUSED'){
            console.error('La Conexion  fue rechazada!');
        }
    }
    if(con) con.release();
        console.log('Base de datos concectada!')
        return;
});
pool.query = promisify(pool.query);
module.exports = pool;