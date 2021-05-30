const { Router } = require("express");
const router = Router();
const {
  inseririnci,
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
  //user
  countinciou,
  //grups
  mostrarusers,
  mostrargrups,
  mostrargrupsd,
  updategrup,
  deletegrup,
  validarUsuari,
  inserirUsuari,
  mostrardetall,
  obtenirtipus,
  fotosinci,
  fotosdetall,
  newuser,
  newgroup,
  mostrarusersd,
  updateuser,
  deleteuser,
  updatefoto,
  passwordreset,
  needemail,
  mostrarfotos,
  mostrarlin,
  incilin,
  Reassignaradmin
} = require("../controllers/index.controllers");

// Incidencies

router.get("/mostrardetall/:id", mostrardetall);
router.get("/mostrarfotos/:id", mostrarfotos);
router.get("/mostrarlin/:id", mostrarlin);
router.get("/mostrarincio", mostrarincio);
router.post("/inseririnci", inseririnci);
router.post("/actualitzar", actualitzar);
router.post("/resoldre", resoldre);
router.post("/editinci", editinci);
router.post("/mostrarinci/", mostrarinci);
router.post("/incilin", incilin);
router.post('/fotosinci', fotosinci);
router.post('/fotosdetall', fotosdetall);
//READ
//tech
router.post("/mostrarinci", mostrarinci);
router.post("/mostrarincio", mostrarincio);
router.post("/mostrarincit", mostrarincit);
router.post("/mostrartecnic", mostrartecnic);
router.post("/reassignaradmin", Reassignaradmin);
//USER
router.post("/mostrarinciu", mostrarinciu);
router.post("/mostrarinciut", mostrarinciut);
//count
//tech
router.post("/countincio", countincio);
//user
router.post("/countinciou", countinciou);

// Grups
router.post("/mostrargrups", mostrargrups);
router.post("/mostrargrupsd", mostrargrupsd);
router.put("/updategrup", updategrup);
router.put("/deletegrup", deletegrup);
router.post("/mostrarusers", mostrarusers);
router.post("/mostraruserd", mostrarusersd);
router.post("/newgroup", newgroup);


// Usuaris
router.post("/login", validarUsuari);
router.post("/signup", inserirUsuari);
router.post("/newuser", newuser);
router.put("/updatefoto", updatefoto);
router.put("/updateuser", updateuser);
router.put("/deleteuser", deleteuser);
router.get('/obtenirtipus', obtenirtipus);
router.post("/needemail", needemail);
router.put("/passwordreset/:token", passwordreset);


module.exports = router;
