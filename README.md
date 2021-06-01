# Fixhub Alpha 1.0
Fixhub és una aplicació web que permet a les empreses facilitar la gestió d’incidències.
## Prerequisits
   * [node.js & npm](https://nodejs.org/en/download/) *recomanem instal·lar versió LTS*
   * [nodemon](https://nodemon.io/) *(opcional)*
   * [Angular](https://angular.io/guide/setup-local)
### node.js & npm
Verifiquem l'instal·lació:
```bash
node -v
npm -v
```
### nodemon
Reinicia l'API si es fan canvis al codi
#### Instal·lació global
```bash
npm install -g nodemon
```
### Angular
#### Instal·lació global
```bash
npm install -g @angular/cli
```
#### Instal·lació local
```bash
cd ../Code
npm install @angular/cli
```
### Instal·lació node modules
Tant a la carpeta [Code](/Code) com a la [FixhubAPI](/FixhubAPI) executar:
```bash
npm i
```
## Connexió SQL Server & Compte de correu
### SQL Server
Renombrar el fitxer [connection-sample.js](/FixhubAPI/src/connection-sample.js) a connection.js modificant les dades següents
```bash
config = {
  user: "database user",
  password: "user passwd",
  server: "server address",
  database: "database name",
  options: {
    enableArithAbort: true,
    encrypt: true 
  },
}
module.exports = config;
```
### Compte de correu
Renombrar el fitxer [mail-sample.js](/FixhubAPI/src/mail-sample.js) a mail.js modificant les dades següents
```bash
var nodemailer = require("nodemailer");

transporter = nodemailer.createTransport({
    service: "service",
    auth: {
        user: "user@gmail.com",
        pass: "password",
    },
});

module.exports = transporter;
```
## Inici dels serveis
Per inciciar l'Angular:
```bash
cd ../Code
ng serve --open
```
*Si el terminal no reconeix el terme ng*
```bash
npm run ng serve --open
```
Per iniciar la Rest API:

*En cas d'haver instal·lat nodemon*
```bash
cd ../FixhubAPI
nodemon index.js
```
*En cas contrari*
```bash
cd ../FixhubAPI
node index.js
```
