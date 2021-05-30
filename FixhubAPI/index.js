const express = require("express");
const app = express();
var cors = require("cors");
var port = 3000;
const expresJwt = require("express-jwt");
var secret = "FA7483AF48D144A97D228DE518A0A4AC9ACE23724A2DCB3F77C25D102733C125";

//middlewares
app.use(express.json({ limit: "150mb" }));
app.use(cors());

//Token
function seguretat() {
  return expresJwt({
    secret: secret,
    algorithms: ["HS256"],
  }).unless({
    //Routes que no necessitaran token
    path: [
      "/login",
      "/signup",
      /^\/mostrardetall\//,
      /^\/passwordreset\//,
      "/needemail"
    ],
  });
}
app.use(seguretat());
//Routes
app.use(require("./src/routes/index.routes"));

app.listen(port);
console.log("Servidor escoltant en el port: ", port);
