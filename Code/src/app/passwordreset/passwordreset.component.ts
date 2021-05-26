import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {
  pass1: string
  pass2: string
  token: string;
  constructor(private dades: DadesService, public route: ActivatedRoute,public router: Router) { }
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("token");
    localStorage.setItem('token',this.token);
  }
  password() {
    if (this.pass1 == this.pass2) {
      this.dades.passwordreset(this.token,this.pass1).subscribe(resp => {
        console.log(resp);
      });
      localStorage.clear();
      alert('constrasenya cambiada');
      this.router.navigate(["/login"]); 
    } else {
      alert('les contrasenyes no coincideixen');
    }
  }
}