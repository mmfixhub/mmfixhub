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
    
  }

  apilogin() {
    this.dades.validarUsuari(this.email, this.password).subscribe(resp => {
      console.log(resp);
      localStorage.setItem('token',resp.token);
      this.dades.idU = resp.id;
      this.dades.tech = resp.tech;
      this.dades.admin = resp.admin;
      this.dades.empresa = resp.empresa;
      this.dades.idU = resp.id;
      if(resp.token != undefined){
        this.dades.log = true;
        console.log(this.dades.log);
        this.router.navigate(["/dash"]);
      }
    });
  }
}
