const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send('Esta dentro del /directorio raiz /');
}); 

router.get('/tres',(req,res) => {
    res.send('Esta es la solicitud 3 /');
}); 

router.get('/cuatro',(req,res) => {
    res.send('Esta es la otra solicitud 4 /');
}); 

router.get('/cinco',(req,res) => {
    res.send('Esta es la segunda solicitud de 5 /');
});

module.exports = router;