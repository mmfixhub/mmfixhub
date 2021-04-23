import { Component, OnInit } from '@angular/core';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  incidencies = [];
  IO:number;
  constructor(private dades:DadesService) { }

  ngOnInit(): void {
    this.dades.MostrarInciO().subscribe((resultat) =>{
      console.log(resultat);
      this.incidencies = resultat;
    })
    this.dades.Countincio().subscribe((resultat) =>{
      console.log(resultat[0].num);
      this.IO = resultat[0].num;
    })
  }

}
