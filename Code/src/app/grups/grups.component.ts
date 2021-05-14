import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-grups',
  templateUrl: './grups.component.html',
  styleUrls: ['./grups.component.css']
})
export class GrupsComponent implements OnInit {
  users = [];
  grups = [];
  admin:boolean;
  constructor(private dades:DadesService,  public router: Router) {}

  ngOnInit(): void {
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
            this.admin = this.dades.admin;
            this.dades.empresa = resp.empresa;
            this.dades.Mostrarusers(token).subscribe((resultat)=>{
              this.users = resultat;
              console.log(resultat);
            });
            this.dades.Mostrargrups(token).subscribe((resultat)=>{
              this.grups = resultat;
              console.log(resultat);
            });
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
