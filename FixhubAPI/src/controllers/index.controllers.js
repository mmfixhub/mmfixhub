const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = {
  user: "fixhub",
  password: "Passw0rd!",
  server: "m2fixhub.database.windows.net",
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
  const { email, password } = req.body;
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("email", sql.NVarChar, email)
        .input("password", sql.NVarChar, password)
        .query("SELECT * FROM Usuaris WHERE Email = @email ");
    })
    .then((result) => {
      console.log(result.recordset[0].Contrasenya);
      console.log(result.recordset[0].Email);
      //res.json(result.recordset);
      if (result.recordset != []) {
        console.log(password);
        bcrypt.compare(
          password,
          result.recordset[0].Contrasenya,
          function (error, resultat) {
            console.log("resultat: ", resultat);
            if (resultat) {
              console.log("email: ", result.recordset[0].Email);
              const token = jwt.sign(
                { email: result.recordset[0].Email },
                "Password!",
                { expiresIn: "12h" }
              );
              console.log("Token: ", token);
              jwt.verify(token, "Password!", function (err, decoded) {
                console.log(decoded.email);
              });
              res.status(200).send({
                id: result.recordset[0].id,
                token: token,
                tech: result.recordset[0].tech,
                admin: result.recordset[0].admin,
                empresa: result.recordset[0].id_Empresa,
                nom: result.recordset[0].Nom,
                cognoms: result.recordset[0].Cognoms,
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
const obtenirtipus = async (req, res) => {
  console.log(req.headers.authorization);
  token = req.headers.authorization;
  token = token.toString().replace("Bearer ", "");
  console.log("token:", token);
  email = "";
  jwt.verify(token, "Password!", function (err, decoded) {
    console.log(decoded.email);
    email = decoded.email;
  });
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("email", sql.NVarChar, email)
        .query("SELECT * FROM Usuaris WHERE Email = @email ");
    })
    .catch((error) => {
      res.status(401).json({
        missatge: error,
      });
    })
    .then((result) => {
      res.status(202).send({
        id: result.recordset[0].id,
        token: token,
        tech: result.recordset[0].tech,
        admin: result.recordset[0].admin,
        empresa: result.recordset[0].id_Empresa,
        nom: result.recordset[0].Nom,
        cognoms: result.recordset[0].Cognoms,
      });
    });
};
const inserirUsuari = async (req, res) => {
  var { nom, cognoms, empresa, telefon, email, passwd, tech,admin, nif } = req.body;
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
        .input("nif", sql.NVarChar, nif)
        .input("tech", sql.Bit, tech)
        .input("admin", sql.Bit, admin)
        .query(
          `INSERT INTO Usuaris (Nom,Cognoms,Telefon_empresa,Email,Contrasenya,admin,tech) values (@nom,@cognoms,@tel,@email,@password,@admin,@tech);
           INSERT INTO Empreses (Empresa,NIF) values (@empresa,@nif);
           UPDATE Usuaris SET id_Empresa = (SELECT id from empreses WHERE empreses.Empresa = @empresa) WHERE Usuaris.email = @email AND Usuaris.nom = @nom AND Usuaris.cognoms = @cognoms;`
        );
    })
    .then(() => {
      res.json("Administrador Registrat");
    })
    .catch((err) => {
      res.json(err);
    });
};
const newuser = async (req, res) => {
  var { nom, cognoms, empresa, telefon, email, passwd,ide,tipus } = req.body;
  var contrassenya = await bcrypt.hash(passwd, 10);
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("nom", sql.NVarChar, nom)
        .input("cognoms", sql.NVarChar, cognoms)
        .input("empresa", sql.Int, empresa)
        .input("ide", sql.Int, ide)
        .input("tel", sql.Int, telefon)
        .input("email", sql.NVarChar, email)
        .input("password", sql.NVarChar, contrassenya)
        .input("tipus", sql.Bit, tipus)
        .query(
          `INSERT INTO Usuaris (Nom,Cognoms,Telefon_empresa,Email,Contrasenya,id_Empresa,id_grup,tech,admin) 
          values (@nom,@cognoms,@tel,@email,@password,@ide,@empresa,@tipus,0);
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
const mostrarusersd = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
      .input("idu", sql.Int, req.body.idU)
      .query(`select Usuaris.id,Usuaris.id_grup,Usuaris.Nom,Usuaris.Email,Usuaris.Telefon_empresa,Usuaris.tech,Grups.Grup
      from Usuaris left join Grups on Usuaris.id_grup = Grups.id
      where Usuaris.id = @idu;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
/***UPDATE */
const updateuser = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("idU", sql.Int, req.Body.idU)
        .input("Email", sql.NVarChar, req.Body.email)
        .input("idG", sql.Int, req.Body.idG)
        .query(`UPDATE Usuaris
        SET Email = @Email, id_grup = @idG
        WHERE Usuaris.id = @idU;`);
    })
    .then((result) => {
      res.json(result.recordset);
      
    })
    .catch((err) => {
      res.json(err);
    });
};
/**DELETE */
const deleteuser = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query(`Delete from Usuaris where Usuaris.id = @id;`);
    })
    .then((result) => {
      res.json(result.recordset);
      res.json("Deleted");
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
        .input("imatge", sql.NVarChar, req.body.imatge)
        .query(
          `INSERT INTO Inci (titol,descripcio,data,prioritat,estat) VALUES (@titol,desc,@data,@prioritat,@estat);
           INSERT INTO InciLin (des)
          `
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


/******* -- UPDATE -- *******/

const actualitzar = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .input("idt", sql.Int, req.body.idt)
        .input("idp", sql.Int, req.body.idp)
        .input("ide", sql.Int, req.body.ide).query(`UPDATE Inci
        SET id_IT = @idt, prioritat = @idp, estat = @ide
        WHERE inci.id = @id;`);
    })
    .then(() => {
      res.json("Assignada CORRECTAMENT");
    })
    .catch((err) => {
      res.json(err);
    });
};
const resoldre = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .input("ide", sql.Int, req.body.ide).query(`UPDATE Inci
        SET estat = @ide
        WHERE Inci.id = @id;`);
    })
    .then(() => {
      res.json("Assignada CORRECTAMENT");
    })
    .catch((err) => {
      res.json(err);
    });
};

/******* -- READ -- *******/

const editinci = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request().input("id", sql.Int, req.body.id)
        .query(`select inci.id,inci.titol,inci.descripcio,inci.Fecha,Usuaris.Nom,(Select Usuaris.Nom from inci
        left join Usuaris on Usuaris.id = Inci.id_IT
        where Inci.id = @id) as tecnic,Inci.estat,prio.prioritat,Inci.id_IT,Inci.prioritat as idp from inci
              left join Usuaris on Usuaris.id = Inci.id_usuari
              left join estat on estat.id = Inci.estat
              left join prio on prio.id = Inci.prioritat
              where inci.id = @id;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
/**TECH */
const mostrarinci = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
      .input("id", sql.Int, req.body.id)
      .query(
        `Select Inci.id,Usuaris.Nom,titol,Fecha,prio.prioritat,estat.estat
          from Inci left join prio on Inci.prioritat = prio.id
          left join estat on estat.id = Inci.estat
          left join Usuaris on Inci.id_usuari = Usuaris.id
          where id_IT = @id and estat.id between 1 and 3;`
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
        .query(`        select Inci.id,Usuaris.Nom,Inci.titol,Inci.Fecha,prio.prioritat,estat.estat
        from Usuaris left join Inci on Inci.id_usuari = Usuaris.id
        left join prio on Inci.prioritat = prio.id
        left join estat on Inci.estat = estat.id
        where estat.id between 1 and 3
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
      .input("id", sql.Int, req.body.id)
        .query(`select Inci.id,Usuaris.Nom,Inci.titol,Inci.Fecha,prio.prioritat,estat.estat
        from Usuaris left join Inci on Inci.id_usuari = Usuaris.id
        left join prio on Inci.prioritat = prio.id
        left join estat on Inci.estat = estat.id
        where estat.id between 4 and 5
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
const mostrartecnic = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request().input("id", sql.Int, req.body.id)
        .query(`select id,Nom from Usuaris
      where id_Empresa = @id
      and tech = 1;`);
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
      return pool.request().input("id", sql.Int, req.body.id).query(
        `select Inci.id,Inci.titol,Inci.Fecha, Usuaris.Nom, prio.prioritat,estat.estat from inci
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
      return pool.request()
      .input("id", sql.Int, req.body.id).query(
        `select Inci.id,Inci.titol,Inci.Fecha, Usuaris.Nom, prio.prioritat,estat.estat from inci
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
      return pool.request().input("idE", sql.Int, req.body.idE)
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
      return pool
        .request()
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
      return pool
        .request()
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
      return pool.request().input("idU", sql.Int, req.body.idU)
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
      return pool.request().input("idU", sql.Int, req.body.idU)
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
      return pool.request().input("idU", sql.Int, req.body.idU)
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
      return pool.request()
      .input("ide", sql.Int, req.body.ide)
      .query(`select * from Grups
      where id_empresa = @ide`);
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
      return pool.request()
      .input("ide", sql.Int, req.body.ide)
      .query(`select Usuaris.id,Usuaris.Nom,Usuaris.Cognoms,Usuaris.Email,Usuaris.Telefon_empresa,Usuaris.tech,Grups.Grup
      from Usuaris left join Grups on Usuaris.id_grup = Grups.id
      where Usuaris.id_Empresa = @ide`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};


const mostrardetall = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("select * from Inci where Inci.id = @id;");
    })
    .then((result) => {
      res.json(result.recordset);
    });
};
const newgroup = async (req, res) => {
  var { nom, ide } = req.body;
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("nom", sql.NVarChar, nom)
        .input("ide", sql.Int, ide)
        .query(
          `Insert into Grups (Grup,id_empresa) values (@nom,@ide);
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


module.exports = {
  validarUsuari,
  inserirUsuari,
  newuser,
  newgroup,
  /**Incidencies */
  inseririnci,
  actualitzar,
  resoldre,
  editinci,
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
  mostrarusersd,
  mostrargrups,
  obtenirtipus,
  mostrardetall,
  /**Update */
  updateuser,
  deleteuser
};
