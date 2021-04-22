const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = {
  user: "",
  password: "",
  server: "f",
  database: "",
  options: {
    enableArithAbort: true,
  },
};

sql.on("error", (err) => {
  console.log(err);
});
/******* -- USERS -- *******/
const validarUsuari = async (req, res) => {
  var { email, password } = req.body;
  var resposta = sql.connect(config).then((pool) => {
      return pool.request()
        .input("email", sql.NVarChar, email)
        .input("password", sql.NVarChar, password)
        .query("SELECT * FROM Usuaris WHERE Email = @email ");
    })
    .then((result) => {
     // console.log(result.recordset[0].Contrasenya);
      //res.json(result.recordset);
      if (result.recordset != []) {
       // console.log(password)
        bcrypt.compare(
          password,
          result.recordset[0].Contrasenya,
          function (error, resultat) {
            console.log('resultat: ',resultat);
            if (resultat) {
              const token = jwt.sign({ sub: result.recordset[0].email }, "Password!", {
                expiresIn: "1d",
              });
              res.status(200).send({
                id: result.recordset[0].id,
                token: token,
              });
            } else {
              res.status(202).json({ missatge: "Contrassenya incorrecta" });
            }
          }
        );
      } else {
        res.status(404).json({
          missatge: "Usuari inexistent",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
 
};

const inserirUsuari = async (req, res) => {
  var { nom, cognoms, empresa, telefon, email, passwd } = req.body;
  var contrassenya = await bcrypt.hash(passwd, 10);
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("nom", sql.NVarChar, nom)
        .input("cognoms", sql.NVarChar, cognoms)
        .input("empresa", sql.NVarChar, empresa)
        .input("tel", sql.Int, telefon)
        .input("email", sql.NVarChar, email)
        .input("password", sql.NVarChar, contrassenya)
        .query(
          `INSERT INTO Usuaris (Nom,Cognoms,Telefon_empresa,Email,Contrasenya,admin,tech) values (@nom,@cognoms,@tel,@email,@password,1,1);
           INSERT INTO Empreses (Empresa) values (@empresa);
           UPDATE Usuaris SET id_Empresa = (SELECT id from empreses WHERE empreses.Empresa = @empresa) WHERE Usuaris.email = @email AND Usuaris.nom = @nom AND Usuaris.cognoms = @cognoms;
           UPDATE Empreses SET id_Admin = (SELECT id from Usuaris WHERE Usuaris.email = @email AND Usuaris.nom = @nom AND Usuaris.cognoms = @cognoms) WHERE Empreses.Empresa = @empresa;
          `
        );
    })
    .then((result) => {
      res.json("Inserit");
    })
    .catch((err) => {
      res.json(err);
    });
};

/****************************************** */
const empreses = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request().query("select * from empreses");
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};

/******* -- INCIDENCIES -- *******/

/******* -- CREATE -- *******/
const inseririnci = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("titol", sql.NVarChar, req.body.titol)
        .input("desc", sql.NVarChar, req.body.desc)
        .input("data", sql.NVarChar, req.body.data)
        .input("prioritat", sql.NVarChar, req.body.prioritat)
        .input("estat", sql.Bit, req.body.estat)
        .query(
          "INSERT INTO Inci (titol,descripcio,data,prioritat,estat) VALUES (@titol,@desc,@data,@prioritat,@estat)"
        );
    })
    .then(() => {
      res.json("ACTUALITZAT CORRECTAMENT");
    })
    .catch((err) => {
      res.json(err);
    });
};

/******* -- DELETE -- *******/

const eliminarinci = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query("DELETE FROM Inci WHERE id = @id");
    })
    .then(() => {
      res.json("Eliminada CORRECTAMENT");
    })
    .catch((err) => {
      res.json(err);
    });
};

/******* -- UPDATE -- *******/

const assignar = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .input("id1", sql.Int, req.body.id1)
        .query("UPDATE Inci SET id_IT = @id1 WHERE id = @id;");
    })
    .then(() => {
      res.json("Assignada CORRECTAMENT");
    })
    .catch((err) => {
      res.json(err);
    });
};

/******* -- READ -- *******/

const mostrarinci = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query(
          "select titol,descripcio,Fecha,Hora,prioritat from Inci where Inci.id_usuari = @id;"
        );
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};

const mostrarincio = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
        .query(`select Inci.id,Nom,titol,descripcio,Fecha,Hora,prioritat from Inci left join Usuaris on Inci.id_usuari = Usuaris.id
        where estat = 1 order by prioritat desc;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const mostrarincit = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
        .query(`select Inci.id,Nom,titol,descripcio,Fecha,Hora from Inci left join Usuaris on Inci.id_usuari = Usuaris.id
        where estat = 0;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const mostrartecnic = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request().query(`select nom,id from IT;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};

module.exports = {
  validarUsuari,
  inserirUsuari,
  empreses,
  inseririnci,
  eliminarinci,
  assignar,
  mostrarinci,
  mostrarincio,
  mostrarincit,
  mostrartecnic,
};
