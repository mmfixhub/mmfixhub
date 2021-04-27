import { Component, OnInit } from '@angular/core';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  constructor(private dades: DadesService) { }
  ngOnInit(): void {
  }

  apilogin() {
    this.dades.validarUsuari(this.email, this.password).subscribe(resp => {
      localStorage.setItem('token',resp.token);
      this.dades.tech = resp.tech;
      this.dades.admin = resp.admin;
    });
  }
}
