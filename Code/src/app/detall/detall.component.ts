import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-detall',
  templateUrl: './detall.component.html',
  styleUrls: ['./detall.component.css']
})
export class DetallComponent implements OnInit {
  incidencia = [];
  idinci = '';
  titol = '';
  descripcio = '';
  constructor(public router: ActivatedRoute, public dades: DadesService) { }

  ngOnInit(): void {
    this.incidencia = [];
    this.idinci = this.router.snapshot.paramMap.get("id");
    this.dades.MostrarDetall(this.idinci).subscribe((resultat) => {
      this.incidencia = resultat;
      console.log('incidencia: ', resultat);
    })
  }

}
