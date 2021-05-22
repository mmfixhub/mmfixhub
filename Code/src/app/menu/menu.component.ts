import { Component, OnInit } from '@angular/core';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(public dades: DadesService) { }
  tech:boolean;
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      var token = localStorage.getItem('token');
      this.dades.obtenirtipus(token)
        .subscribe((resp) => {
          if (resp) {
            console.log("aaaa: ", resp);
            this.dades.username = resp.nom + " " + resp.cognoms;
          }
        },
          (error) => {
            this.dades.username = "";
            alert('No autoritzat  ' + error.status)
            localStorage.clear();
          })
    }
    else {

    }
  }

  logout() {
    localStorage.clear();
    this.dades.login = false;
    this.ngOnInit();
  }
}
