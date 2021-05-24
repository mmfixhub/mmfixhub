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
  token = '';


  constructor(private http: HttpClient, public route: Router) { }

  inci() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      var token = localStorage.getItem('token');
      this.obtenirtipus(token)
        .subscribe((resp) => {
          if (resp) {
            console.log(resp);
            this.idU = resp.id;
            this.tech = resp.tech;
            this.admin = resp.admin;
            this.empresa = resp.empresa;
            this.username = resp.nom + ' ' + resp.cognoms;
          }
        },
          (error) => {
            this.idU = undefined;
            this.tech = undefined;
            this.admin = undefined;
            this.empresa = undefined;
            alert('No autoritzat  ' + error.status)
            localStorage.clear();
            this.route.navigate(["/login"]);

          })
    }
    else {
      this.route.navigate(["/login"]);

    }
  }
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
  newuser(token, nom, cognoms, empresa, telefon, email, contrassenya, tipus) {
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
        passwd: contrassenya
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
  MostrarInciO(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/mostrarincio',
      {
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
  //count
  //tech
  Countincio(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/countincio', {
      idE: this.empresa
    },
      { headers }
    );
  }
  Countincip(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/countincip', {
      idE: this.empresa
    },
      { headers }
    );
  }
  Countincih(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/countincih', {
      idE: this.empresa
    },
      { headers }
    );
  }
  //user
  Countinciou(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/countinciou', {
      idU: this.idU,
    }, { headers }
    );
  }
  Countincipu(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/countincipu', {
      idU: this.idU,
    }, { headers }
    );
  }
  Countincihu(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/countincihu', {
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
  inserir_fotos(token, idU, foto) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log('fotos',foto.length);
      return this.http.post<any>(
        this.urlServidor + '/test',
        {
          idU: idU,
          foto: foto
        },
        { headers }
      )
    
  
    ;
  }
  updateuser(token, id, email, idg) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor + '/updateuser',
      {
        idU: id,
        email: email,
        idG: idg
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
    console.log('dades: ',email)
    return this.http.post<any>(
      this.urlServidor + '/needemail',{
        email: email
      },
    );
  }
  passwordreset(token, password) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log('pass: ', password);
    return this.http.put<any>(
      this.urlServidor + '/passwordreset/'+token,
      {
        password: password
      },
      { headers }
    );
  }
}