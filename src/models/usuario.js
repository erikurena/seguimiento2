const conexion = require('../database');
module.exports = {
registro (usuario,pasword,nombre,apellido,correo,celular,foto){
    return new Promise((resolve,reject) =>{
        conexion.query('insert into usuario(usuario,pasword,nombre,apellido,foto,correo,celular) values(?,?,?,?,?,?,?)',
        [usuario,pasword,nombre,apellido,foto,correo,celular]),
        (err) => {
            if(err) reject(err);
            else resolve();
        }
    })
},
verificar (usuario,pasword){
    return new Promise((resolve,reject) =>{
        conexion.query('select * from usuario where usuario=? and pasword =?',
        [usuario,pasword],
        (err,usuario)=>{
            if(err) reject(err)
            else
            if(usuario.length >= 1) resolve(usuario[0]);     
            else resolve(false);
        })
    })
}
}