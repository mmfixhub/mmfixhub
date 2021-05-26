const sql = require("mssql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const config = {
  user: "fixhub",
  password: "Passw0rd!",
  server: "m2fixhub.database.windows.net",
  database: "fixhub",
  options: {
    enableArithAbort: true,
  },
};
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fixhubtickets@gmail.com",
    pass: "Manlleu@2021",
  },
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
        email: result.recordset[0].Email,
      });
    });
};
const inserirUsuari = async (req, res) => {
  var { nom, cognoms, empresa, telefon, email, passwd, tech, admin, nif } =
    req.body;
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
           UPDATE Usuaris SET id_Empresa = (SELECT id FROM empreses WHERE empreses.Empresa = @empresa) WHERE Usuaris.email = @email AND Usuaris.nom = @nom AND Usuaris.cognoms = @cognoms;`
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
  var { nom, cognoms, empresa, telefon, email, passwd, ide, tipus } = req.body;
  var contrassenya = await bcrypt.hash(passwd, 10);
  var foto =
    "data:image/png;base64,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";
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
        .input("foto", sql.NVarChar, foto)
        .query(
          `INSERT INTO Usuaris (Nom,Cognoms,Telefon_empresa,Email,Contrasenya,id_Empresa,id_grup,tech,admin,foto) 
          values (@nom,@cognoms,@tel,@email,@password,@ide,@empresa,@tipus,0,@foto);
           `
        );
    })
    .then(() => {
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
      return pool.request().input("idu", sql.Int, req.body.idU)
        .query(`SELECT Usuaris.id,Usuaris.id_grup,Usuaris.Nom,Usuaris.Cognoms,Usuaris.Email,Usuaris.Telefon_empresa,Usuaris.tech,Grups.Grup,Usuaris.foto
      FROM Usuaris left join Grups on Usuaris.id_grup = Grups.id
      WHERE Usuaris.id = @idu;`);
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
        .input("idU", sql.Int, req.body.idU)
        .input("Email", sql.NVarChar, req.body.email)
        .input("nom", sql.NVarChar, req.body.nom)
        .input("cognoms", sql.NVarChar, req.body.cognoms)
        .input("telefon", sql.Int, req.body.telefon)
        .input("idG", sql.Int, req.body.idG).query(`UPDATE Usuaris
        SET Nom = @nom, Cognoms = @cognoms, Telefon_empresa = @telefon,Email = @Email, id_grup = @idG
        WHERE Usuaris.id = @idU;`);
    })
    .then((result) => {
      res.json(result);
      res.json("Actualitzat CORRECTAMENT");
    })
    .catch((err) => {
      res.json(err);
    });
};
const updatefoto = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("idU", sql.Int, req.body.idU)
        .input("foto", sql.NVarChar, req.body.foto).query(`UPDATE Usuaris
        SET foto = @foto
        WHERE Usuaris.id = @idU;`);
    })
    .then((result) => {
      res.json(result);
      res.json("Actualitzat CORRECTAMENT");
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
        .query(`Delete FROM Usuaris WHERE Usuaris.id = @id;`);
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
        .input("desc", sql.NVarChar, req.body.descripcio)
        .input("prioritat", sql.NVarChar, req.body.prioritat)
        .input("estat", sql.Bit, req.body.estat)
        .input("id_usuari", sql.NVarChar, req.body.usuari)
        .query(
          `INSERT INTO Inci (titol,descripcio,Fecha,prioritat,estat,id_usuari) VALUES (@titol,@desc,GETDATE(),@prioritat,@estat,@id_usuari);
           `
        );
    })
    .then((result) => {
      res.json(result.recordset[0].id);
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
        .query(`SELECT inci.id,inci.titol,inci.descripcio,inci.Fecha,Usuaris.Nom,(SELECT Usuaris.Nom FROM inci
        left join Usuaris on Usuaris.id = Inci.id_IT
        WHERE Inci.id = @id) as tecnic,Inci.estat,prio.prioritat,Inci.id_IT,Inci.prioritat as idp FROM inci
              left join Usuaris on Usuaris.id = Inci.id_usuari
              left join estat on estat.id = Inci.estat
              left join prio on prio.id = Inci.prioritat
              WHERE inci.id = @id;`);
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
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query(
          `SELECT Inci.id,Usuaris.Nom,titol,Fecha,prio.prioritat,estat.estat
          FROM Inci left join prio on Inci.prioritat = prio.id
          left join estat on estat.id = Inci.estat
          left join Usuaris on Inci.id_usuari = Usuaris.id
          WHERE id_IT = @id and estat.id between 1 and 3;`
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
      return pool.request().input("id", sql.Int, req.body.id)
        .query(`        SELECT Inci.id,Usuaris.Nom,Inci.titol,Inci.Fecha,prio.prioritat,estat.estat
        FROM Usuaris left join Inci on Inci.id_usuari = Usuaris.id
        left join prio on Inci.prioritat = prio.id
        left join estat on Inci.estat = estat.id
        WHERE estat.id between 1 and 3
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
      return pool.request().input("id", sql.Int, req.body.id)
        .query(`SELECT Inci.id,Usuaris.Nom,Inci.titol,Inci.Fecha,prio.prioritat,estat.estat
        FROM Usuaris left join Inci on Inci.id_usuari = Usuaris.id
        left join prio on Inci.prioritat = prio.id
        left join estat on Inci.estat = estat.id
        WHERE estat.id between 4 and 5
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
        .query(`SELECT id,Nom FROM Usuaris
      WHERE id_Empresa = @id
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
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query(
          `SELECT Inci.id,Inci.titol,Inci.Fecha, Usuaris.Nom, prio.prioritat,estat.estat FROM inci
          left join Usuaris on Usuaris.id = Inci.id_IT
          left join estat on estat.id = Inci.estat
          left join prio on prio.id = Inci.prioritat
          WHERE id_usuari = @id and estat.id between 1 and 3;`
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
          `SELECT Inci.id,Inci.titol,Inci.Fecha, Usuaris.Nom, prio.prioritat,estat.estat FROM inci
          left join Usuaris on Usuaris.id = Inci.id_IT
          left join estat on estat.id = Inci.estat
          left join prio on prio.id = Inci.prioritat
          WHERE id_usuari = @id and estat.id between 4 and 5;`
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
        .query(`SELECT count(Inci.id) as num FROM Inci
      left join Usuaris on Inci.id_usuari = Usuaris.id
      WHERE Usuaris.id_Empresa = @idE
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
        .query(`SELECT count(Inci.id) as num FROM Inci
      left join Usuaris on Inci.id_usuari = Usuaris.id
      WHERE Usuaris.id_Empresa = @idE
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
        .query(`SELECT count(Inci.id) as num FROM Inci
      left join Usuaris on Inci.id_usuari = Usuaris.id
      WHERE Usuaris.id_Empresa = @idE
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
        .query(`SELECT count(id) as num FROM Inci
      WHERE id_usuari = @idU
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
        .query(`SELECT count(id) as num FROM Inci
      WHERE id_usuari = @idU
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
        .query(`SELECT count(id) as num FROM Inci
      WHERE id_usuari = @idU
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
      return pool.request().input("ide", sql.Int, req.body.ide)
        .query(`SELECT * FROM Grups
      WHERE id_empresa = @ide`);
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
      return pool.request().input("ide", sql.Int, req.body.ide)
        .query(`SELECT Usuaris.id,Usuaris.Nom,Usuaris.Cognoms,Usuaris.Email,Usuaris.Telefon_empresa,Usuaris.tech,Grups.Grup
      FROM Usuaris left join Grups on Usuaris.id_grup = Grups.id
      WHERE Usuaris.id_Empresa = @ide`);
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
        .query(`
        SELECT Inci.id,Inci.titol,Inci.descripcio,Inci.Fecha,Inci.id_IT,
        (SELECT Usuaris.Nom FROM Usuaris WHERE Usuaris.id = Inci.id_IT) AS 'Ntecnic',
        (SELECT Usuaris.Cognoms FROM Usuaris WHERE Usuaris.id = Inci.id_IT) AS 'Stecnic',Inci.id_usuari,
        (SELECT Usuaris.Nom FROM Usuaris WHERE Usuaris.id = Inci.id_usuari) AS 'Nuser',
        (SELECT Usuaris.Cognoms FROM Usuaris WHERE Usuaris.id = Inci.id_usuari) AS 'Suser',
        Inci.prioritat AS 'idP',prio.prioritat,Inci.estat AS 'idE',estat.estat FROM Inci 
        left join prio on Inci.prioritat = prio.id
        left join estat on Inci.estat = estat.id
        left join Usuaris on Inci.id_usuari = Usuaris.id
        WHERE Inci.id = @id;
        `);
    })
    .then((result) => {
      res.json(result.recordset);
    });
};
const mostrarlin = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query(`SELECT InciLin.id_inci,InciLin.linea,InciLin.descripcion,InciLin.Fecha,InciLin.usuario,Usuaris.Nom,Usuaris.Cognoms,Usuaris.foto  FROM InciLin
        left join Usuaris on
        InciLin.usuario = Usuaris.id
        WHERE InciLin.id_inci = @id 
        order by InciLin.linea
        ;`);
    })
    .then((result) => {
      res.json(result.recordset);
    });
};
const mostrarfotos = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query("SELECT id_lin,img FROM fotos WHERE id_inci = @id");
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
const fotosinci = async (req, res) => {
  var { idU, foto } = req.body;
  console.log("fotos abans de insert:", fotos.length);
  for (let i = 0; i < foto.length; i++) {
    if (foto[i].image == "") {
      break;
    } else {
      sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("foto", sql.NVarChar, foto[i].imatge)
            .input("id_usuari", sql.Int, idU)
            .query(
              `Insert into fotos (id_inci,id_lin,img) values ((SELECT MAX(id) FROM Inci WHERE Inci.id_usuari = @id_usuari),1,@foto);
           `
            );
        })
        .then(() => {
          res.json("Inserit");
        })
        .catch((err) => {
          res.json(err);
        });
    }
  }
};
const fotosdetall = async (req, res) => {
  var { linea,idI, foto } = req.body;
  console.log("fotosdetall:", fotos.length);
  for (let i = 0; i < foto.length; i++) {
    if (foto[i].image == "") {
      break;
    } else {
      sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("foto", sql.NVarChar, foto[i].imatge)
            .input("id_inci", sql.Int, idI)
            .input("lin", sql.Int, linea)
            .query(
              `Insert into fotos (id_inci,id_lin,img) values (@id_inci,@lin,@foto);
           `
            );
        })
        .then(() => {
          res.json("Inserit");
        })
        .catch((err) => {
          res.json(err);
        });
    }
  }
};
const incilin = async (req,res) =>{
  var {resposta,idU,idI} = req.body;
  sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("resposta", sql.NVarChar, resposta)
          .input("idU", sql.Int, idU)
          .input("idI", sql.Int, idI)
          .query(
            `INSERT INTO InciLin (id_inci,linea,descripcion,usuario,Fecha) VALUES(@idI,(SELECT ISNULL(MAX(linea),0)+1 FROM InciLin WHERE id_inci = @idI),@resposta,@idU,GETDATE());`
          );
      })
      .then(() => {
        res.status(202).send({
          missatge: "insert",
        });
      })
}
const needemail = async (req, res) => {
  if (req.body.email !== undefined) {
    var emailAddress = req.body.email;
    console.log("email body: ", emailAddress);
    sql
      .connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("email", sql.NVarChar, emailAddress)
          .query(
            `SELECT id,Nom,Cognoms,email,Contrasenya FROM Usuaris WHERE Email = @email;`
          );
      })
      .then((result) => {
        if (result.recordset != []) {
          console.log("resposta SQL: ", result);
          const token = jwt.sign(
            {
              email: result.recordset[0].email,
              password: result.recordset[0].Contrasenya,
            },
            "Password!",
            { expiresIn: "10m" } //expiració del link
          );
          jwt.verify(token, "Password!", function (err, decoded) {
            console.log(decoded.email);
          });
          var mailOptions = {
            FROM: "fixhubtickets@gmail.com",
            to: result.recordset[0].email,
            subject: "test",
            html:
              '<p>That was easy!<p><a href="http://localhost:4200/reset/' +
              token +
              '">Reset Password</a>',
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          res.status(202).send({
            id: result.recordset[0].id,
            nom: result.recordset[0].Nom,
            cognom: result.recordset[0].Cognoms,
            email: result.recordset[0].Email,
            //com envio link per correu?¿?¿
            //link ha de ser cap a l'angular ? i despres a l'api no?
            token: token,
          });
        } else {
          res.status(404).json({
            missatge: "email incorrecte",
          });
        }
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.status(404).json({
      missatge: "email inexistent",
    });
  }
};

const passwordreset = async (req, res) => {
  var token = req.params.token;
  var email = "";
  console.log("token: ", token);
  var contrassenya = await bcrypt.hash(req.body.password, 10);
  console.log("passwd: ", contrassenya);
  jwt.verify(token, "Password!", function (err, decoded) {
    console.log(decoded);
    email = decoded.email;
    passwdToken = decoded.password;
  });
  var match = true;
  match = await bcrypt.compare(req.body.password, passwdToken);
  console.log('comparacio: ',match);  
  if (!match) {
    console.log('entra?: ');
    sql.connect(config)
      .then((pool) => {
        return pool
          .request()
          .input("email", sql.NVarChar, email)
          .input("contrasenya", sql.NVarChar, contrassenya)
          .query(
            `UPDATE Usuaris SET Contrasenya = @contrasenya WHERE Email = @email;`
          );
      })
      .then(() => {
        res.json("Contrasenya cambiada");
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
   
  }
};

module.exports = {
  validarUsuari,
  inserirUsuari,
  incilin,
  newuser,
  newgroup,
  /**Incidencies */
  inseririnci,
  actualitzar,
  resoldre,
  editinci,
  mostrarlin,
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
  mostrarfotos,
  /**Update */
  updateuser,
  deleteuser,
  updatefoto,
  needemail,
  passwordreset,
  fotosinci,
  fotosdetall
};
