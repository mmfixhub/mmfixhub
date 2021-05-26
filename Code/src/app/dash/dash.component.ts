import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadesService } from '../dades.service';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  incidencies = [];
  IO: number;
  IP: number;
  IH: number;
  tech: boolean;
  token:string;


  constructor(private dades: DadesService, public router: Router) { }

  ngOnInit(): void {
    //this.dades.inci();
    console.log(token);
    if (localStorage.getItem('token')) {
      var token = localStorage.getItem('token');
      this.token = token;
      this.dades.obtenirtipus(token)
        .subscribe((resp) => {
          if (resp) {
            console.log("aaaa: ", resp);
            this.dades.idU = resp.id;
            this.dades.tech = resp.tech;
            this.dades.admin = resp.admin;
            this.dades.empresa = resp.empresa;
            this.dades.login = true;

            this.tech = this.dades.tech;
            console.log('tecnic?: ', this.dades.tech);
            if (this.tech) {
              this.dades.Countincio(token,1).subscribe((resultat) => {
                console.log('ae', resultat[0].num);
                this.IO = resultat[0].num;
              })
              this.dades.Countincio(token,2).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IP = resultat[0].num;
              })
              this.dades.Countincio(token,3).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IH = resultat[0].num;
              })
              this.dades.MostrarInciO(token).subscribe((resultat) => {
                console.log("ee", resultat);
                this.incidencies = resultat;
              })
            } else {
              this.dades.Countinciou(token,1).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IO = resultat[0].num;
              })
              this.dades.Countinciou(token,2).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IP = resultat[0].num;
              })
              this.dades.Countinciou(token,3).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IH = resultat[0].num;
              })
              this.dades.MostrarInciu(token).subscribe((resultat)=>{
                console.log(resultat);
                this.incidencies = resultat;
              })

            }
          }
        },
          (error) => {
            this.dades.idU = undefined;
            this.dades.tech = undefined;
            this.dades.admin = undefined;
            this.dades.empresa = undefined;
            this.dades.login = false;
            alert('No autoritzat  ' + error.status)
            localStorage.clear();
            this.router.navigate(["/login"]);

          })
    }
    else {
      this.router.navigate(["/login"]);

    }


  }
  Agafar(id){
    console.log("Assignant...")
    this.dades.actualitzar(this.token,id,this.dades.idU,1,2).subscribe((resultat) =>{
      console.log(resultat);
    })
    this.ngOnInit();
  }

}
