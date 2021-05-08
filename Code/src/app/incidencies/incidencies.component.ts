import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
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

  incidencia = [];
  id : number;
  tech:boolean;
  tecnic:string;
  idt:number;
  idp:number;
  ide:number;
  canvi:boolean;


  prioritat ="Baixa";
  titol = "";
  desc = "";
  estat:number;
  todaysDataTime = '';

  constructor(private dades:DadesService) {

   }


  ngOnInit(): void {
    this.tech = this.dades.tech;
    this.canvi = false;
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
    this.prioritat = "High";
    this.idp = 3;
  }
  Mitja(){
    this.prioritat = "Medium";
    this.idp = 2;
  }
  Baixa(){
    this.prioritat = "Low";
    this.idp = 1;
  }

  Guardar(){
    this.dades.inseririnci(this.titol,this.desc,this.todaysDataTime,this.idp,this.estat)
    .subscribe((resultat)=>{
      console.log(resultat);
    });
  }
  Eliminar(id){
    this.dades.eliminarinci(id).subscribe((resultat)=>{
    console.log(resultat);
    });
  }
  Assignar(id,id1){
    this.dades.assignar(id,id1).subscribe((resultat) =>{
      console.log(resultat);
    })
  }
  resoldre(id,ide){
    this.dades.resoldre(id,ide).subscribe((resultat) =>{
      console.log(resultat);
    })
  }
  Atecnic(tecnic,id){
    if(this.idt == null){
      this.canvi = true;
    }
    this.tecnic = tecnic;
    this.idt = id;
    
  }
  Actualitzar(id){
    if(this.canvi){
      this.ide = 2;
    }
    this.dades.actualitzar(id,this.idt,this.idp,this.ide).subscribe((resultat) =>{
      console.log(resultat);
    })
    this.ngOnInit();
    this.canvi = false;
  }
  editarinci(id){
    this.dades.editinci(id).subscribe((resultat) =>{
      console.log(resultat);
      this.incidencia = resultat;
      this.idt = resultat[0].id_IT;
      console.log("idt",this.idt)
      this.prioritat = resultat[0].prioritat;
      console.log("prioritat",this.prioritat)
      this.idp = resultat[0].idp;
      console.log("idp",this.idp);
      this.ide = resultat[0].estat;
      console.log("ide",this.ide);
      if(this.idt == null){
        this.tecnic = "Click to Assign"
      }else{
        this.tecnic = resultat[0].tecnic;
      }
    })
  }
  //imatge
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: HTMLImageElement) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
