import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  apiprofile: string | undefined;
  apiemail: string | undefined;
  email: string;
  password: string;
  constructor(private msalservice: MsalService, private httpClient: HttpClient, private dades: DadesService, private router: Router) { }
  ngOnInit(): void {
    this.msalservice.instance.handleRedirectPromise().then(
      res => {
        if (res != null && res.account != null) {
          this.msalservice.instance.setActiveAccount(res.account);
        }
      }
    )
  }

  logged(): boolean {
    return this.msalservice.instance.getActiveAccount() != null
  }
  login() {
    this.msalservice.loginRedirect();
  }
  logout() {
    this.msalservice.logout()
  }

  obtenirPerfil() {
    this.httpClient.get('https://graph.microsoft.com/v1.0/me').subscribe(resp => {
      this.apiprofile = JSON.stringify(resp);
    })
  }

  obteniremail() {
    this.httpClient.get('https://graph.microsoft.com/v1.0/me/messages').subscribe(resp => {
      this.apiemail = JSON.stringify(resp);
    })
  }

  apilogin() {
    this.dades.validarUsuari(this.email, this.password).subscribe(resp => {
      console.log(resp);
      this.router.navigate(['/incidencies']);
      // this.menu.islogin = true;
      localStorage.setItem('token',resp.token);
      this.dades.idU = resp.id;
      this.dades.tech = resp.tech;
      this.dades.admin = resp.admin;
      this.dades.empresa = resp.id_Empresa;
    });
  }
  apilogout() {    
      localStorage.clear();
      this.router.navigate(['/login']);
      
  }
}
