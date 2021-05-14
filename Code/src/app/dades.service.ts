import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DadesService {
  urlServidor = 'http://localhost:3000';
  idU: number;
  tech: boolean;
  admin: boolean;
  empresa: number;
  login: boolean;


  constructor(private http: HttpClient, public route: Router) { }

  inci() {
    if (localStorage.getItem('token')) {
      var token = localStorage.getItem('token');
      this.obtenirtipus(token)
        .subscribe((resp) => {
          if (resp) {
            console.log(resp);
            this.idU = resp.id;
            this.tech = resp.tech;
            this.admin = resp.admin;
            this.empresa = resp.empresa;
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
  inserirUsuari(token, nom, cognoms, empresa, telefon, email, contrassenya) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor + '/signup',
      {
        nom: nom,
        cognoms: cognoms,
        empresa: empresa,
        telefon: telefon,
        email: email,
        passwd: contrassenya
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
  editinci(token,id) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log(id);
    return this.http.post<any>(
      this.urlServidor + '/editinci', {
      id: id
    },
    {headers}
    );
  }
  resoldre(token,id, ide) {
    console.log(id);
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor + '/resoldre', {
      id: id,
      ide: ide
    },{headers}
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
      this.urlServidor + '/mostrarincit',{
        id: this.empresa
      },
      { headers }
    );
  }
  Mostrartecnic(token) {
    const headers = { 'Authorization': `Bearer ${token}` };
    console.log();
    return this.http.post<any>(
      this.urlServidor+'/mostrartecnic',{
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
  inseririnci(token, titol, desc, data, prioritat, estat, imatge) {
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor + '/inseririnci',
      {
        titol: titol,
        desc: desc,
        data: data,
        prioritat: prioritat,
        estat: estat,
        imatge: imatge,
      }, { headers }
    );
  }
  actualitzar(token,id,idt,idp,ide){
    console.log(id);
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>(
      this.urlServidor+'/actualitzar',
      {
        id: id,
        idt: idt,
        idp: idp,
        ide: ide,

      },
      {headers}
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

}
