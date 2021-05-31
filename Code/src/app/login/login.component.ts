import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private dades: DadesService, public router: Router) { }
  ngOnInit(): void {
    localStorage.clear();
  }
  apilogin() {
    this.dades.validarUsuari(this.email.toLocaleLowerCase(), this.password).subscribe(resp => {
      console.log(resp);
      localStorage.setItem('token',resp.token);
      this.dades.login = true;
      this.dades.idU = resp.id;
      this.dades.tech = resp.tech;
      this.dades.admin = resp.admin;
      this.dades.empresa = resp.empresa;
      this.dades.username = resp.nom + ' '+ resp.cognoms;
      this.dades.email = resp.email;

      if(resp.token != undefined){
        this.router.navigate(["/dash"]);
      }
      else{
        this.dades.login = false;
        localStorage.clear();
       alert(resp.missatge)
      }
    });
  }
}
