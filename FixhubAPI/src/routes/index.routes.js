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
  validarUsuari,
  inserirUsuari,
} = require("../controllers/index.controllers");

// Incidencies
router.post("/inseririnci", inseririnci);
router.post("/eliminarinci", eliminarinci);
router.post("/assignar", assignar);
router.get("/mostrarinci/:id", mostrarinci);
router.get("/mostrarincio", mostrarincio);
router.get("/mostrarincit", mostrarincit);
router.get("/mostrartecnic", mostrartecnic);
router.get("/countincio", countincio);
// Usuaris
router.post("/login", validarUsuari);
router.post("/signup", inserirUsuari);

module.exports = router;
