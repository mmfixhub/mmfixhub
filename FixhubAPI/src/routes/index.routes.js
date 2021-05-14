const { Router } = require("express");
const router = Router();
const {
  inseririnci,
  guardarinci,
  actualitzar,
  resoldre,
  editinci,
  //READ
  //TECH
  mostrarinci,
  mostrarincio,
  mostrarincit,
  mostrartecnic,
  //USER
  mostrarinciu,
  mostrarinciut,
  //COUNT
  //tech
  countincio,
  countincip,
  countincih,
  //user
  countinciou,
  countincipu,
  countincihu,
  //grups
  mostrarusers,
  mostrargrups,
  validarUsuari,
  inserirUsuari,
  mostrardetall,
  obtenirtipus,
} = require("../controllers/index.controllers");

// Incidencies
router.post("/inseririnci", inseririnci);
router.post("/actualitzar", actualitzar);
router.post("/resoldre", resoldre);
router.post("/editinci", editinci);
router.post("/mostrarinci/", mostrarinci);
router.get("/mostrardetall/:id", mostrardetall);
router.get("/mostrarincio", mostrarincio);
//READ
//tech
router.post("/mostrarinci", mostrarinci);
router.post("/mostrarincio", mostrarincio);
router.post("/mostrarincit", mostrarincit);
router.post("/mostrartecnic", mostrartecnic);
//USER
router.post("/mostrarinciu", mostrarinciu);
router.post("/mostrarinciut", mostrarinciut);
//count
//tech
router.post("/countincio", countincio);
router.post("/countincip", countincip);
router.post("/countincih", countincih);
//user
router.post("/countinciou", countinciou);
router.post("/countincipu", countincipu);
router.post("/countincihu", countincihu);

// Grups
router.post("/mostrargrups", mostrargrups);
router.post("/mostrarusers", mostrarusers);

// Usuaris
router.post("/login", validarUsuari);
router.post("/signup", inserirUsuari);
router.get('/obtenirtipus',obtenirtipus);

module.exports = router;
