import { Component, OnInit } from '@angular/core';
import { DadesService } from '../dades.service';
import { IncidenciesComponent } from '../incidencies/incidencies.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuariValidat : [];
  user = '';
  passwd = '';
  constructor(private dades:DadesService, ) { }

  ngOnInit(): void {
  }
  validar(){
    this.dades.validarUsuari(this.user,this.passwd).subscribe((resultat)=>{
        console.log('validar: ', resultat);
        this.usuariValidat = resultat;
     // this.inci.ngOnInit();
    })
  }
  sortir(){
    localStorage.clear();
    this.usuariValidat = [];
    this.ngOnInit();
  }
}
