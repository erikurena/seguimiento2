const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const musuario = require('../models/usuario');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

function sha256(string){
    return crypto.createHash('sha256').update(string).digest('hex');
}

passport.serializeUser(function(user,done){
    done(null,user);
})

passport.deserializeUser(function(user,done){
    done(null,user);
});

passport.use(new LocalStrategy((usuario,pasword,done)=>{
    musuario.verificar(usuario,sha256(pasword))
    .then(usuario =>{
        if(usuario){
            session.usuario = usuario;
            done (null,usuario);
        }
        else{
            done(null, false);
        }
    })
}));

router.get('/',(req,res) => {
  res.render('index');
}); 

router.get('/inicio',(req,res) => {
    res.render('paginicio');
}); 

router.get('/registro',(req,res) => {
  res.render('registro');
}); 

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/fotos'),
    filename : (req, file,cb) =>{
        cb(null,Date.now()+'.'+path.extname(file.originalname))  ;
    }
});

const uploadImage = multer({
    storage,
    limits : {fileSize : 1000000}
}).single('foto');

router.post('/registro2',uploadImage,(req,res)=>{
    
    const usuario = req.body.usuario;
    const pasword = sha256(req.body.pasword);
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const celular = req.body.celular;
    const archivo = req.file;
    const nombrefoto = archivo.filename;
    musuario.registro(usuario, pasword, nombre, apellido, correo,celular,nombrefoto)
    .then(res.redirect('/'));
});

router.post('/login2', passport.authenticate('local',{failureRedirect:'/inicio'},function(req,res){
    console.log('Autentificado!');
}))
module.exports = router;