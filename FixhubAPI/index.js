const express = require("express");
const app = express();
var cors = require("cors");
var port = 3000;
const expresJwt = require("express-jwt");

//middlewares
app.use(express.json({ limit: "150mb" }));
app.use(cors());

//Token
function seguretat() {
  return expresJwt({
    secret: "Password!",
    algorithms: ["HS256"],
  }).unless({
    //Routes que no necessitaran token
    path: [
      "/login",
      "/signup",
      /^\/mostrarinci\//,
      "/mostrarincio",
      "/mostrarincit",
      "/mostrarincic",
      "/mostrartecnic",
    ],
  });
}
app.use(seguretat());
//Routes
app.use(require("./src/routes/index.routes"));

app.listen(port);
console.log("Servidor escoltant en el port: ", port);
