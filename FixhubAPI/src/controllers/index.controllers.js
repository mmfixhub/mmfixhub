const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = {
  user: "fixhub",
  password: "Passw0rd!mm",
  server: "mmfixhub.database.windows.net",
  database: "fixhub",
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
                tech: result.recordset[0].tech,
                admin: result.recordset[0].admin,
                empresa: result.recordset[0].id_Empresa,
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
/**TECH */
const mostrarinci = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query(
          `Select Inci.id,Usuaris.Nom,titol,Fecha,prio.prioritat,estat.estat
          from Inci left join prio on Inci.prioritat = prio.id
          left join estat on estat.id = Inci.estat
          left join Usuaris on Inci.id_usuari = Usuaris.id
          where id_IT = @id;`
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
      .input("id", sql.Int, req.body.id)
        .query(`select Inci.id,Usuaris.Nom,Inci.titol,Inci.Fecha,prio.prioritat,estat.estat
        from Usuaris left join Inci on Inci.id_usuari = Usuaris.id
        left join prio on Inci.prioritat = prio.id
        left join estat on Inci.estat = estat.id
        where Inci.estat = 1
        or Inci.estat = 2
        or Inci.estat = 3
        and id_Empresa = @id
        order by Inci.estat;`);
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
        .query(`select Inci.id,Usuaris.Nom,Inci.titol,Inci.Fecha,prio.prioritat,estat.estat
        from Usuaris left join Inci on Inci.id_usuari = Usuaris.id
        left join prio on Inci.prioritat = prio.id
        left join estat on Inci.estat = estat.id
        where estat.estat = 'Solved'
        or estat.estat = 'Closed'
        and Usuaris.id = Inci.id_usuari;`);
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
      return pool.request().query(`select nom,id from Usuaris where tech = 1;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};

/**USER */
const mostrarinciu = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query(
          `select Inci.titol,Inci.Fecha, Usuaris.Nom, prio.prioritat,estat.estat from inci
          left join Usuaris on Usuaris.id = Inci.id_IT
          left join estat on estat.id = Inci.estat
          left join prio on prio.id = Inci.prioritat
          where id_usuari = @id and estat.id between 1 and 3;`
        );
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const mostrarinciut = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query(
          `select Inci.titol,Inci.Fecha, Usuaris.Nom, prio.prioritat,estat.estat from inci
          left join Usuaris on Usuaris.id = Inci.id_IT
          left join estat on estat.id = Inci.estat
          left join prio on prio.id = Inci.prioritat
          where id_usuari = @id and estat.id between 4 and 5;`
        );
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};

/** COUNT **/
/*Tech*/
const countincio = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
      .input("idE", sql.Int, req.body.idE)
      .query(`Select count(Inci.id) as num from Inci
      left join Usuaris on Inci.id_usuari = Usuaris.id
      where Usuaris.id_Empresa = @idE
      and Inci.estat = 1;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const countincip = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
      .input("idU", sql.Int, req.body.idU)
      .input("idE", sql.Int, req.body.idE)
      .query(`Select count(Inci.id) as num from Inci
      left join Usuaris on Inci.id_usuari = Usuaris.id
      where Usuaris.id_Empresa = @idE
      and Inci.estat = 2;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const countincih = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
      .input("idU", sql.Int, req.body.idU)
      .input("idE", sql.Int, req.body.idE)
      .query(`Select count(Inci.id) as num from Inci
      left join Usuaris on Inci.id_usuari = Usuaris.id
      where Usuaris.id_Empresa = @idE
      and Inci.estat = 3;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
/**user */
const countinciou = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
      .input("idU", sql.Int, req.body.idU)
      .query(`select count(id) as num from Inci
      where id_usuari = @idU
      and estat = 1;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const countincipu = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
      .input("idU", sql.Int, req.body.idU)
      .query(`select count(id) as num from Inci
      where id_usuari = @idU
      and estat = 2;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const countincihu = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
      .input("idU", sql.Int, req.body.idU)
      .query(`select count(id) as num from Inci
      where id_usuari = @idU
      and estat = 3;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
/**** Grups *****/
const mostrargrups = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request().query(`Select * from EmpresaCli`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const mostrarusers = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request().query(`select * from Usuaris,EmpresaCli
      where tech = 0
      and Usuaris.id_EmpresaCli = EmpresaCli.id`);
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
  /**Incidencies */
  empreses,
  inseririnci,
  eliminarinci,
  assignar,
  /**READ */
  /**TECH */
  mostrarinci,
  mostrarincio,
  mostrarincit,
  mostrartecnic,
  /**USER */
  mostrarinciu,
  mostrarinciut,
  /**COUNT*/
  /**tech*/
  countincio,
  countincip,
  countincih,
  /**user */
  countinciou,
  countincipu,
  countincihu,
  /**Grups */
  mostrarusers,
  mostrargrups
};
