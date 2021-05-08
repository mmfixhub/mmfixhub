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


  constructor(private dades: DadesService, public router: Router) { }

  ngOnInit(): void {
    //this.dades.inci();
    console.log(token);
    if (localStorage.getItem('token')) {
      var token = localStorage.getItem('token');
      this.dades.obtenirtipus(token)
        .subscribe((resp) => {
          if (resp) {
            console.log("aaaa: ", resp);
            this.dades.idU = resp.id;
            this.dades.tech = resp.tech;
            this.dades.admin = resp.admin;
            this.dades.empresa = resp.empresa;

            this.tech = this.dades.tech;
            var token = localStorage.getItem('token');
            console.log('tecnic?: ', this.dades.tech);
            this.dades.MostrarInciO(token).subscribe((resultat) => {
              console.log("ee", resultat);
              this.incidencies = resultat;
            })
            if (this.tech) {
              this.dades.Countincio(token).subscribe((resultat) => {
                console.log('ae', resultat[0].num);
                this.IO = resultat[0].num;
              })
              this.dades.Countincip(token).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IP = resultat[0].num;
              })
              this.dades.Countincih(token).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IH = resultat[0].num;
              })
            } else {
              this.dades.Countinciou(token).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IO = resultat[0].num;
              })
              this.dades.Countincipu(token).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IP = resultat[0].num;
              })
              this.dades.Countincihu(token).subscribe((resultat) => {
                console.log(resultat[0].num);
                this.IH = resultat[0].num;
              })

            }
          }
        },
          (error) => {
            this.dades.idU = undefined;
            this.dades.tech = undefined;
            this.dades.admin = undefined;
            this.dades.empresa = undefined;
            alert('No autoritzat  ' + error.status)
            localStorage.clear();
            this.router.navigate(["/login"]);

          })
    }
    else {
      this.router.navigate(["/login"]);

    }


  }

}
