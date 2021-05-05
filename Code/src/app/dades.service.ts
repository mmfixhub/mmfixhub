import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DadesService {
  urlServidor = 'http://localhost:3000';
  idU = 4;
  tech = true;
  admin:boolean;
  empresa = 3;

  constructor(private http:HttpClient) { }

  validarUsuari(email,contrassenya){
    return this.http.post<any>(
        this.urlServidor + '/login',
        {
          email: email,
          password: contrassenya
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
  //Mostrar
  //Tech
  MostrarInci(){
    console.log();
    return this.http.post<any>(
      this.urlServidor+'/mostrarinci',
      {
        id: this.idU
      }
    );
  }
  MostrarInciO(){
    console.log();
    return this.http.post<any>(
      this.urlServidor+'/mostrarincio',
      {
        id: this.empresa
      }
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
  //user
  MostrarInciu(){
    console.log();
    return this.http.post<any>(
      this.urlServidor+'/mostrarinciu',
      {
        id: this.idU
      }
    );
  }
  MostrarInciut(){
    console.log();
    return this.http.post<any>(
      this.urlServidor+'/mostrarinciut',
      {
        id: this.idU
      }
    );
  }
//count
//tech
  Countincio(){
    console.log();
    return this.http.post<any>(
      this.urlServidor+'/countincio',{
        idE: this.empresa
      }
    );
  }
  Countincip(){
    console.log();
    return this.http.post<any>(
      this.urlServidor+'/countincip',{
        idE: this.empresa
      }
    );
  } 
  Countincih(){
    console.log();
    return this.http.post<any>(
      this.urlServidor+'/countincih',{
        idE: this.empresa
      }
    );
  }
//user
Countinciou(){
  console.log();
  return this.http.post<any>(
    this.urlServidor+'/countinciou',{
      idU: this.idU,
    }
  );
}
Countincipu(){
  console.log();
  return this.http.post<any>(
    this.urlServidor+'/countincipu',{
      idU: this.idU,
    }
  );
} 
Countincihu(){
  console.log();
  return this.http.post<any>(
    this.urlServidor+'/countincihu',{
      idU: this.idU,
    }
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
  Mostrarusers(){
    console.log();
    return this.http.get<any>(
      this.urlServidor+'/mostrarusers',
    );
  }
  Mostrargrups(){
    console.log();
    return this.http.get<any>(
      this.urlServidor+'/mostrargrups',
    );
  }

  Carrega(){
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "\o/";
      console.log("cond");
      e.returnValue = confirmationMessage;     // Gecko, Trident, Chrome 34+
      return confirmationMessage;              // Gecko, WebKit, Chrome <34
  });
  }

}
