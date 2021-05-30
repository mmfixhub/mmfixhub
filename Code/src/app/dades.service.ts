import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DadesService {
  urlServidor = 'http://localhost:3000';
  idU: number;
  username: string;
  tech: boolean;
  admin: boolean;
  empresa: number;
  login: boolean;
  email: string;
  token = '';


  constructor(private http: HttpClient, public route: Router) { }

  validarUsuari(email, contrassenya) {
    return this.http.post<any>(
      this.urlServidor + '/login',
      {
        email: email,
        password: contrassenya
      }
    );
  }
  obtenirtipus(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http
      .get<any>(
        this.urlServidor + '/obtenirtipus',
        { headers }
      )
  }
  inserirUsuari(nom, cognoms, empresa, telefon, email, contrassenya, nif, admin, tech) {
    return this.http.post<any>(
      this.urlServidor + '/signup',
      {
        nom: nom,
        cognoms: cognoms,
        empresa: empresa,
        telefon: telefon,
        email: email,
        passwd: contrassenya,
        nif: nif,
        admin: admin,
        tech: tech
      },
    );
  }
  newuser(token, nom, cognoms, empresa, telefon, email, tipus) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor + '/newuser',
      {
        nom: nom,
        cognoms: cognoms,
        empresa: empresa,
        ide: this.empresa,
        tipus: tipus,
        telefon: telefon,
        email: email,
      },
      { headers }
    );
  }
  newgroup(token, nom) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor + '/newgroup',
      {
        nom: nom,
        ide: this.empresa
      },
      { headers }
    );
  }
  //Mostrar
  //Tech
  MostrarInci(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrarinci',
      {
        id: this.idU
      }
      , { headers }
    );
  }
  MostrarDetall(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log(id);
    return this.http.get<any>(
      this.urlServidor + '/mostrardetall/' + id,
      { headers }
    )
  }
  MostrarDetallLin(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log(id);
    return this.http.get<any>(
      this.urlServidor + '/mostrarlin/' + id,
      { headers }
    )
  }
  MostrarFotos(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log(id);
    return this.http.get<any>(
      this.urlServidor + '/mostrarfotos/' + id,
      { headers }
    )
  }
  editinci(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log(id);
    return this.http.post<any>(
      this.urlServidor + '/editinci', {
      id: id
    },
      { headers }
    );
  }
  resoldre(token, id, ide) {
    console.log(id);
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor + '/resoldre', {
      id: id,
      ide: ide
    }, { headers }
    );
  }
  MostrarInciO(token,id1,id2) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrarincio',
      {
        id1: id1,
        id2: id2,
        id: this.empresa
      },
      { headers }
    );
  }
  MostrarInciT(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrarincit', {
      id: this.empresa
    },
      { headers }
    );
  }
  Mostrartecnic(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrartecnic', {
      id: this.empresa
    },
      { headers }
    );
  }
  //user
  MostrarInciu(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrarinciu',
      {
        id: this.idU
      },
      { headers }
    );
  }
  MostrarInciut(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrarinciut',
      {
        id: this.idU
      },
      { headers }
    );
  }
  Reassignaradmin(token,id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/reassignaradmin',
      {
        idt: id,
        ida: this.idU
      },
      { headers }
    );
  }
  //count
  //tech
  Countincio(token, num) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/countincio',
      {
        num: num,
        idE: this.empresa
      },
      { headers }
    );
  }
  //user
  Countinciou(token, num) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/countinciou',
      {
        num: num,
        idU: this.idU,
      }, { headers }
    );
  }
  inseririnci(token, titol, descripcio, usuari, prioritat, estat) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor + '/inseririnci',
      {
        titol: titol,
        descripcio: descripcio,
        prioritat: prioritat,
        estat: estat,
        usuari: usuari
      }, { headers }
    );
  }
  actualitzar(token, id, idt, idp, ide) {
    console.log(id);
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor + '/actualitzar',
      {
        id: id,
        idt: idt,
        idp: idp,
        ide: ide,

      },
      { headers }
    );
  }
  Mostrarusers(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrarusers',
      {
        ide: this.empresa
      },
      { headers }
    );
  }
  Mostraruserd(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostraruserd',
      {
        idU: id
      },
      { headers }
    );
  }
  Mostrargrups(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrargrups',
      {
        ide: this.empresa
      },
      { headers }
    );
  }
  Mostrargrupsd(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrargrupsd',
      {
        id: id
      },
      { headers }
    );
  }
  Updategrup(token, id, nom) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.put<any>(
      this.urlServidor + '/updategrup',
      {
        id: id,
        nom: nom
      },
      { headers }
    );
  }
  Deletegrup(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.put<any>(
      this.urlServidor + '/deletegrup',
      {
        id: id,
      },
      { headers }
    );
  }
  inserir_fotosInci(token, idU, foto) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log('fotos', foto.length);
    return this.http.post<any>(
      this.urlServidor + '/fotosinci',
      {
        idU: idU,
        foto: foto
      },
      { headers }
    )
      ;
  }
  inserir_fotosLin(token, idI, linea, foto) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log('fotos', foto.length);
    return this.http.post<any>(
      this.urlServidor + '/fotosdetall',
      {
        idI: idI,
        linea: linea,
        foto: foto
      },
      { headers }
    )
      ;
  }
  inciresposta(token, resposta, idI, idU) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor + '/incilin',
      {
        resposta: resposta,
        idI: idI,
        idU: idU,
      },
      { headers }
    )
      ;
  }
  updateuser(token, id, nom, cognoms, telefon, email, idg) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.put<any>(
      this.urlServidor + '/updateuser',
      {
        idU: id,
        email: email,
        nom: nom,
        cognoms: cognoms,
        telefon: telefon,
        idG: idg
      },
      { headers }
    );
  }
  updatefoto(token, id, foto) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.put<any>(
      this.urlServidor + '/updatefoto',
      {
        idU: id,
        foto: foto
      },
      { headers }
    );
  }
  deleteuser(token, id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.put<any>(
      this.urlServidor + '/deleteuser',
      {
        id: id
      },
      { headers }
    );
  }

  needemail(email) {
    console.log('dades: ', email)
    return this.http.post<any>(
      this.urlServidor + '/needemail', 
      {email: email},
    );
  }
  passwordreset(token, password) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log('pass: ', password);
    return this.http.put<any>(
      this.urlServidor + '/passwordreset/' + token,
      {
        password: password
      },
      { headers }
    );
  }
  passwordset(token, password, password1) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log('pass: ', password);
    return this.http.put<any>(
      this.urlServidor + '/passwordset',
      {
        id: this.idU,
        password: password,
        password1: password1
      },
      { headers }
    );
  }
}