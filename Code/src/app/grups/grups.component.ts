import { Component, OnInit } from '@angular/core';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-grups',
  templateUrl: './grups.component.html',
  styleUrls: ['./grups.component.css']
})
export class GrupsComponent implements OnInit {
  users = [];
  grups = [];
  constructor(private dades:DadesService) {}

  ngOnInit(): void {
    this.dades.Mostrarusers().subscribe((resultat)=>{
      this.users = resultat;
      console.log(resultat);
    })
    this.dades.Mostrargrups().subscribe((resultat)=>{
      this.grups = resultat;
      console.log(resultat);
    })
  }

}
