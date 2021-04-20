import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DadesService {
  urlServidor = 'http://localhost:3000';
  idU:number;

  constructor(private http:HttpClient) { }

  validarUsuari(email,contrassenya){
    return this.http.post<any>(
        this.urlServidor + '/login',
        {
          email: email,
          passwd: contrassenya
        }
      );
  }
  inserirUsuari(nom,cognoms,empresa,telefon,email,contrassenya){
    return this.http.post<any>(
        this.urlServidor + '/signup',
        {
          nom: nom,
          cognoms: cognoms,
          empresa: empresa,
          telefon: telefon, 
          email: email,
          passwd:contrassenya
        }
      );
  }

  MostrarInci(id){
    console.log(id);
    return this.http.get<any>(
      this.urlServidor+'/mostrarinci/' + id,
    );
  }
  MostrarInciO(){
    console.log();
    return this.http.get<any>(
      this.urlServidor+'/mostrarincio',
    );
  }
  MostrarInciT(){
    console.log();
    return this.http.get<any>(
      this.urlServidor+'/mostrarincit',
    );
  }
  Mostrartecnic(){
    console.log();
    return this.http.get<any>(
      this.urlServidor+'/mostrartecnic',
    );
  }

  inseririnci(titol,desc,data,prioritat,estat){
    return this.http.post<any>(
      this.urlServidor+'/inseririnci',
      {
        titol: titol,
        desc: desc,
        data: data,
        prioritat: prioritat,
        estat: estat
      },
    );
  }
  eliminarinci(id){
    console.log(id);
    return this.http.post<any>(
      this.urlServidor+'/eliminarinci',
      {
        id: id
      }
    );
  }
  assignar(id,id1){
    console.log(id);
    return this.http.post<any>(
      this.urlServidor+'/assignar',
      {
        id: id,
        id1: id1
      }
    );
  }

}
