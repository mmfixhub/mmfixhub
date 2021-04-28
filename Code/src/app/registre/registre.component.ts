import { Component, OnInit } from '@angular/core';
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
  constructor(private dades: DadesService) { }

  ngOnInit(): void {
  }

  apiregister() {
    this.dades.inserirUsuari(this.nom, this.cognoms, this.empresa, this.telefon, this.email, this.password).subscribe(resp => {
      console.log(resp)
    });

  }
}
