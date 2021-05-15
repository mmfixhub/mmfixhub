import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-detall',
  templateUrl: './detall.component.html',
  styleUrls: ['./detall.component.css']
})
export class DetallComponent implements OnInit {
  incidencia = [];
  idinci = '';
  constructor(public router: ActivatedRoute, public route: Router, public dades: DadesService) { }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    this.incidencia = [];
    this.idinci = this.router.snapshot.paramMap.get("id");
    this.dades.MostrarDetall(token, this.idinci).subscribe((resultat) => {
      this.incidencia = resultat;
    })
  }
}
