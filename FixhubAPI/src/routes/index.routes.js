const {Router} = require('express');
const router = Router();
const {inseririnci,eliminarinci,assignar, mostrarinci, mostrarincio, mostrarincit,mostrartecnic, validarUsuari} = require('../controllers/index.controllers');

 
// Incidencies
 router.post('/inseririnci',inseririnci);
 router.post('/eliminarinci',eliminarinci);
 router.post('/assignar',assignar);
 router.get('/mostrarinci/:id',mostrarinci);
 router.get('/mostrarincio',mostrarincio);
 router.get('/mostrarincit',mostrarincit);
 router.get('/mostrartecnic',mostrartecnic);
// Usuaris
 router.get('/validar/?E=:email&P=:passwd',validarUsuari);

module.exports = router;