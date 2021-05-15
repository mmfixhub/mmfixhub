import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {
  nom: string;
  cognoms: string;
  empresa: string;
  telefon: string;
  email: string;
  password: string;
  nif: string;
  constructor(private dades: DadesService,public router:Router) { }

  ngOnInit(): void {
  }

  apiregister() {
    this.dades.inserirUsuari(this.nom, this.cognoms, this.empresa, this.telefon, this.email, this.password,this.nif,1,1).subscribe(resp => {
      console.log(resp)
      if(resp != undefined){
        this.router.navigate(["/login"]); 
      }
    });

  }
}
