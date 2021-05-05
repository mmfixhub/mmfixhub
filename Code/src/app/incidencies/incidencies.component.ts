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
  prionum = 1;
  titol = "";
  desc = "";
  estat:number;
  id : number;
  tech:boolean;
  todaysDataTime = '';

  constructor(private dades:DadesService) {

   }


  ngOnInit(): void {
    this.tech = true;
    if(this.dades.tech == true){
      this.dades.MostrarInci().subscribe((resultat)=>{
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
    }else{
      this.dades.MostrarInciu().subscribe((resultat)=>{
        this.incidencies = resultat;
        console.log(resultat);
      })
      this.dades.MostrarInciut().subscribe((resultat)=>{
        this.incidenciesT = resultat;
        console.log(resultat);
      })
    }

  }

  Alta(){
    this.prioritat = "Alta";
    this.prionum = 3;
  }
  Mitja(){
    this.prioritat = "Mitja";
    this.prionum = 2;
  }
  Baixa(){
    this.prioritat = "Baixa";
    this.prionum = 1;
  }
  Guardar(){
    this.dades.inseririnci(this.titol,this.desc,this.todaysDataTime,this.prionum,this.estat)
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
