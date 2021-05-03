const { Router } = require("express");
const router = Router();
const {
  inseririnci,
  eliminarinci,
  assignar,
  mostrarinci,
  mostrarincio,
  mostrarincit,
  mostrartecnic,
  countincio,
  countincip,
  countincih,
  mostrarusers,
  mostrargrups,
  validarUsuari,
  inserirUsuari,
  mostrardetall,
} = require("../controllers/index.controllers");

// Incidencies
router.post("/inseririnci", inseririnci);
router.post("/eliminarinci", eliminarinci);
router.post("/assignar", assignar);
router.get("/mostrarinci/:id", mostrarinci);
router.get("/mostrardetall/:id", mostrardetall);
router.get("/mostrarincio", mostrarincio);
router.get("/mostrarincit", mostrarincit);
router.get("/mostrartecnic", mostrartecnic);
router.get("/countincio", countincio);
router.get("/countincip", countincip);
router.get("/countincih", countincih);

// Grups
router.get("/mostrargrups", mostrargrups);
router.get("/mostrarusers", mostrarusers);

// Usuaris
router.post("/login", validarUsuari);
router.post("/signup", inserirUsuari);

module.exports = router;
