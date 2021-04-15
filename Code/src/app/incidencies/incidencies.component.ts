import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-incidencies',
  templateUrl: './incidencies.component.html',
  styleUrls: ['./incidencies.component.css']
})
export class IncidenciesComponent implements OnInit {

  incidencies = [];
  incidenciesO = [];
  incidenciesT = [];
  tecnics = [];

  prioritat ="Baixa";
  titol = "";
  desc = "";
  estat:boolean;
  id : number;
  id1 : number;

  today= new Date();
  todaysDataTime = '';

  constructor(private dades:DadesService) {

   }


  ngOnInit(): void {
    this.id1 = 1;
    this.dades.MostrarInci(this.id1).subscribe((resultat)=>{
      this.incidencies = resultat;
      console.log(resultat);
    })
    this.dades.MostrarInciO().subscribe((resultat =>{
      this.incidenciesO = resultat;
      console.log(resultat);
    }))
    this.dades.MostrarInciT().subscribe((resultat =>{
      this.incidenciesT = resultat;
      console.log(resultat);
    }))
    this.dades.Mostrartecnic().subscribe((resultat =>{
      this.tecnics = resultat;
      console.log(resultat);
    }))
  }

  Alta(){
    this.prioritat = "Alta";
  }
  Mitja(){
    this.prioritat = "Mitja";
  }
  Baixa(){
    this.prioritat = "Baixa";
  }
  Guardar(){
    this.dades.inseririnci(this.titol,this.desc,this.todaysDataTime,this.prioritat,this.estat)
    .subscribe((resultat)=>{
      console.log(resultat);
      this.ngOnInit();
    });
  }
  Eliminar(id){
    this.dades.eliminarinci(id).subscribe((resultat)=>{
    console.log(resultat);
      this.ngOnInit();
    });
  }
  Assignar(id,id1){
    this.dades.assignar(id,id1).subscribe((resultat) =>{
      console.log(resultat);
      this.ngOnInit();
    })
  }
}
