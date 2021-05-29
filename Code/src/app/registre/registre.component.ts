import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-registre',
  templateUrl: './registre.component.html',
  styleUrls: ['./registre.component.css']
})
export class RegistreComponent implements OnInit {
  validate() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    form.classList.add('was-validated');
  }

  nom: string;
  cognoms: string;
  empresa: string;
  telefon: string;
  email: string;
  password: string;
  nif: string;
  constructor(private dades: DadesService, public router: Router) { }

  ngOnInit(): void {
  }

  apiregister() {
    if (this.nom == undefined || this.cognoms == undefined || this.empresa == undefined || this.telefon == undefined ||
      this.empresa == undefined || this.password == undefined || this.nif == undefined ||
      this.nom == '' || this.cognoms == '' || this.empresa == '' || this.telefon == '' ||
      this.empresa == '' || this.password == '' || this.nif == ''
      ) { alert('complete el formulario') } else {
      this.dades.inserirUsuari(this.nom, this.cognoms, this.empresa, this.telefon, this.email.toLocaleLowerCase(), this.password, this.nif.toLocaleLowerCase(), 1, 1).subscribe(resp => {
        console.log(resp)
        if (resp != undefined) {
          this.router.navigate(["/login"]);
        }
      });
    }
  }
}
