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
var fotoperfil = 'data:image/png;base64,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'
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
                email: result.recordset[0].Email,
              });
            } else {
              res.status(202).json({ missatge: "Contrassenya incorrecta" });
            }
          }
        );
      }
    })
    .catch(() => {
      res.json({
        missatge: "Usuari inexistent",
      });
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
  var { nom, cognoms, empresa, telefon, email, passwd, tech, admin, nif } = req.body;
  var contrassenya = await bcrypt.hash(passwd, 10);
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("email", sql.NVarChar, email)
        .query(`SELECT Usuaris.email,Usuaris.id_Empresa, empreses.empresa,Empreses.NIF FROM Usuaris 
        left join empreses on empreses.id = Usuaris.id_Empresa
        WHERE Email = @email;`);
    })
    .then((result) => {
      if (result.recordset[0] != []) {
        console.log(result.recordset);
        if (result.recordset[0].email == email) {
          if (result.recordset[0].NIF == nif) {
            res.status(302).json({ missatge: "empresa y usuario existentes" })
          } else {
            res.status(302).json({ missatge: "usuario existente" })
          }
        }
      }
    }).catch(() => {
      sql
        .connect(config)
        .then((pool) => {
          return pool
            .request()
            .input("nif", sql.NVarChar, nif)
            .query(`SELECT NIF FROM Empreses WHERE NIF = @nif;`);
        })
        .then((result) => {
          if (result.recordset[0] != []) {
            console.log(result.recordset);
            if (result.recordset[0].NIF == nif) {
              res.status(302).json({ missatge: "empresa existente" })
            }
          }
        }).catch(() => {
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
                .input("foto", sql.NVarChar, fotoperfil)
                .query(
                  `INSERT INTO Usuaris (Nom,Cognoms,Telefon_empresa,Email,Contrasenya,admin,tech,foto) values (@nom,@cognoms,@tel,@email,@password,@admin,@tech,@foto);
                 INSERT INTO Empreses (Empresa,NIF) values (@empresa,@nif);
                 UPDATE Usuaris SET id_Empresa = (SELECT id FROM empreses WHERE empreses.Empresa = @empresa) WHERE Usuaris.email = @email AND Usuaris.nom = @nom AND Usuaris.cognoms = @cognoms;`
                );
            })
            .then(() => {
              res.json("Administrador Registrat");
            })
            .catch((err) => {
              res.send({ misstage: 'complete el formulario' });
            })
        })
    }
    )
};
const newuser = async (req, res) => {
  var { nom, cognoms, empresa, telefon, email, ide, tipus } = req.body;
  var contra = await bcrypt.hash(req.body.email, 10);
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
        .input("tipus", sql.Bit, tipus)
        .input("foto", sql.NVarChar, fotoperfil)
        .input("contra", sql.NVarChar, contra)
        .query(
          `INSERT INTO Usuaris (Nom,Cognoms,Telefon_empresa,Email,Contrasenya,id_Empresa,id_grup,tech,admin,foto) 
          values (@nom,@cognoms,@tel,@email,@contra,@ide,@empresa,@tipus,0,@foto);
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
        .query(`SELECT Usuaris.id,Usuaris.id_grup,Usuaris.Nom,Usuaris.Cognoms,Usuaris.Email,Usuaris.Telefon_empresa,Usuaris.tech,Usuaris.admin,Grups.Grup,Usuaris.foto
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
        .input("id_usuari", sql.Int, req.body.usuari)
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
        .query(`SELECT inci.id,inci.titol,inci.descripcio,inci.Fecha,Usuaris.Nom,Usuaris.Cognoms,Usuaris.foto,(SELECT Usuaris.Nom FROM inci
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
      return pool.request()
      .input("id", sql.Int, req.body.id)
      .input("id1", sql.Int, req.body.id1)
      .input("id2", sql.Int, req.body.id2)
        .query(`select Inci.id,Usuaris.Nom,Usuaris.Email,Inci.titol,Inci.descripcio,Inci.Fecha,Inci.estat as eid,Inci.prioritat as pid,prio.prioritat,estat.estat,Grups.Grup
        from Usuaris left join Inci on Inci.id_usuari = Usuaris.id
        left join Grups on Usuaris.id_grup = Grups.id
        left join prio on Inci.prioritat = prio.id
        left join estat on Inci.estat = estat.id
        WHERE estat.id between @id1 and @id2
        and Usuaris.id_Empresa = @id
        order by Fecha desc;`);
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
        .query(`SELECT id,Nom,Cognoms,admin FROM Usuaris
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
          `select Inci.id,Inci.titol,Inci.Fecha,Inci.descripcio, Usuaris.Nom, prio.prioritat,estat.estat,estat.id as eid from inci
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
          `select Inci.id,Inci.titol,Inci.Fecha,Inci.estat as eid, Usuaris.Nom, prio.prioritat,estat.estat from inci
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
const Reassignaradmin = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("idt", sql.Int, req.body.idt)
        .input("ida", sql.Int, req.body.ida)
        .query(
          `Update Usuaris set admin = 0
          where Usuaris.id = @ida;
          Update Usuaris set admin = 1
          where Usuaris.id = @idt;`
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
        .input("num", sql.Int, req.body.num)
        .query(`Select count(Inci.id) as num from Inci
      left join Usuaris on Inci.id_usuari = Usuaris.id
      where Usuaris.id_Empresa = @idE
      and Inci.estat = @num;`);
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
        .input("num", sql.Int, req.body.num)
        .query(`select count(id) as num from Inci
      where id_usuari = @idU
      and estat = @num;`);
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
        .query(`select Grups.id,Grups.Grup,Count(Usuaris.id) as num
        from Grups left join Usuaris on Grups.id = Usuaris.id_grup
        where Grups.id_empresa = @ide
        group by Grups.id,Grups.Grup;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const mostrargrupsd = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool.request()
        .input("id", sql.Int, req.body.id)
        .query(`select * from Grups
        where id = @id;`);
    })
    .then((result) => {
      res.json(result.recordset);
    })
    .catch((err) => {
      res.json(err);
    });
};
const updategrup = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .input("nom", sql.NVarChar, req.body.nom)
        .query(`UPDATE Grups
        SET Grup = @nom 
        WHERE Grups.id = @id;`);
    })
    .then((result) => {
      res.json(result);
      res.json("Actualitzat CORRECTAMENT");
    })
    .catch((err) => {
      res.json(err);
    });
};
const deletegrup = (req, res) => {
  sql
    .connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query(`Delete from Grups where id = @id;`);
    })
    .then((result) => {
      res.json(result);
      res.json("Actualitzat CORRECTAMENT");
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
        .query(`SELECT Usuaris.id,Usuaris.Nom,Usuaris.Cognoms,Usuaris.Email,Usuaris.Telefon_empresa,Usuaris.tech,Usuaris.admin,Usuaris.id_grup,Grups.Grup
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
        (SELECT Usuaris.foto FROM Usuaris WHERE Usuaris.id = Inci.id_IT) AS 'Ftecnic',
        (SELECT Usuaris.Nom FROM Usuaris WHERE Usuaris.id = Inci.id_IT) AS 'Ntecnic',
        (SELECT Usuaris.Cognoms FROM Usuaris WHERE Usuaris.id = Inci.id_IT) AS 'Stecnic',Inci.id_usuari,
        (SELECT Usuaris.foto FROM Usuaris WHERE Usuaris.id = Inci.id_usuari) AS 'Fuser',
        (SELECT Usuaris.Nom FROM Usuaris WHERE Usuaris.id = Inci.id_usuari) AS 'Nuser',
        (SELECT Usuaris.Cognoms FROM Usuaris WHERE Usuaris.id = Inci.id_usuari) AS 'Suser',
		    (SELECT Usuaris.id_Empresa From Usuaris WHERE Usuaris.id = Inci.id_usuari) AS 'idEU',
		    (SELECT Usuaris.id_Empresa From Usuaris WHERE Usuaris.id = Inci.id_IT) AS 'idET',
        Inci.prioritat AS 'idP',prio.prioritat,Inci.estat AS 'idE',estat.estat FROM Inci 
        left join prio on Inci.prioritat = prio.id
        left join estat on Inci.estat = estat.id
        left join Usuaris on Inci.id_usuari = Usuaris.id
		    left join Empreses on Empreses.id = Usuaris.id_Empresa
        WHERE Inci.id = @id;
        `);
    })
    .then((result) => {
      console.log(result.recordset[0].id_usuari);
      if (result.recordset[0] != undefined) {
        res.json(result.recordset);
      } else {
        res.status(404).json({
          missatge: "Usuari inexistent",
        });
      }
    }).catch((err) => {
      res.json(err);
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
  console.log("fotos abans de insert:", foto.length);
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
              `Insert into fotos (id_inci,id_lin,img) values ((SELECT MAX(id) FROM Inci WHERE Inci.id_usuari = @id_usuari),0,@foto);
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
  var { linea, idI, foto } = req.body;
  console.log("fotosdetall:", foto.length);
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
              `Insert into fotos (id_inci,id_lin,img) values (@id_inci,ISNULL(@lin,0),@foto);
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
const incilin = async (req, res) => {
  var { resposta, idU, idI } = req.body;
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
        if (result.recordset[0] != undefined) {
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
              res.status(202).send({
                id: result.recordset[0].id,
                nom: result.recordset[0].Nom,
                cognom: result.recordset[0].Cognoms,
                email: result.recordset[0].Email,
                token: token,
                missatge: 'email enviado'
              });
            }
          });
        } else {
          res.json({
            missatge: "email incorrecto",
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
    console.log('decoded:', decoded);
    if (decoded == undefined) {
      res.json("Token expirado")
      return
    } else {
      email = decoded.email;
      passwdToken = decoded.password;
    }
  });
  var match = true;
  match = await bcrypt.compare(req.body.password, passwdToken);
  console.log('comparacio: ', match);
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
        res.json("Contraseña cambiada");
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    res.json({ missatge: 'Ha introducido una contraseña anterior' });
  }
};

const passwordset = async (req, res) => {
  var pasactual = "";
  var contrassenya = req.body.password;
  var contrassenya1 = await bcrypt.hash(req.body.password1, 10);
  console.log("passwd: ", contrassenya);
  sql.connect(config)
    .then((pool) => {
      return pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query(
          `SELECT Contrasenya FROM Usuaris where id = @id ;`
        );
    })
    .then((result) => {
      pasactual = result.recordset[0].Contrasenya
      console.log('contrasenya actual', pasactual);
    });
  //
  bcrypt.compare(
    contrassenya, pasactual,
    function (error, resultat) {
      console.log("resultat: ", resultat);
      if (error) {
        console.log("no match");
        throw error
      } else if (resultat) {
        console.log("match");
        sql.connect(config)
          .then((pool) => {
            return pool
              .request()
              .input("id", sql.Int, req.body.id)
              .input("contrasenya", sql.NVarChar, contrassenya1)
              .query(
                `UPDATE Usuaris SET Contrasenya = @contrasenya WHERE id = @id;`
              );
          })
          .then(() => {
            res.json("Contrasenya cambiada");
          })
          .catch((err) => {
            res.json(err);
          });
      } else if (!resultat) {
        res.status(202).json({ missatge: "No es pot introduïr una contrasenya anterior" });
      }
    }
  );
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
  Reassignaradmin,
  /**USER */
  mostrarinciu,
  mostrarinciut,
  /**COUNT*/
  /**tech*/
  countincio,
  /**user */
  countinciou,
  /**Grups */
  mostrarusers,
  mostrarusersd,
  mostrargrups,
  mostrargrupsd,
  updategrup,
  deletegrup,
  obtenirtipus,
  mostrardetall,
  mostrarfotos,
  /**Update */
  updateuser,
  deleteuser,
  updatefoto,
  needemail,
  passwordreset,
  passwordset,
  fotosinci,
  fotosdetall
};
