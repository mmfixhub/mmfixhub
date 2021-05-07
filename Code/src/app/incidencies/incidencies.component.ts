import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  prioritat ="Baixa";
  prionum = 1;
  titol = "";
  desc = "";
  estat:number;
  id : number;
  tech:boolean;
  todaysDataTime = '';
  token:string;
  constructor(private dades:DadesService,public router:Router) {

   }


  ngOnInit(): void {
    this.tech = true;
    if (localStorage.getItem('token')) {
      var token = localStorage.getItem('token');
      this.token = localStorage.getItem('token');
      this.dades.obtenirtipus(token)
        .subscribe((resp) => {
          if (resp) {
            console.log("aaaa: ", resp);
            this.dades.idU = resp.id;
            this.dades.tech = resp.tech;
            this.dades.admin = resp.admin;
            this.dades.empresa = resp.empresa;
          }
          if(this.dades.tech == true){
            this.dades.MostrarInci(token).subscribe((resultat)=>{
              this.incidencies = resultat;
              console.log(resultat);
            })
            this.dades.MostrarInciO(token).subscribe((resultat =>{
              this.incidenciesO = resultat;
              console.log(resultat);
            }))
            this.dades.MostrarInciT(token).subscribe((resultat =>{
              this.incidenciesT = resultat;
              console.log(resultat);
            }))
            this.dades.Mostrartecnic(token).subscribe((resultat =>{
              this.tecnics = resultat;
              console.log(resultat);
            }))
          }else{
            this.dades.MostrarInciu(token).subscribe((resultat)=>{
              this.incidencies = resultat;
              console.log(resultat);
            })
            this.dades.MostrarInciut(token).subscribe((resultat)=>{
              this.incidenciesT = resultat;
              console.log(resultat);
            })
          }
        },
          (error) => {
            this.dades.idU = undefined;
            this.dades.tech = undefined;
            this.dades.admin = undefined;
            this.dades.empresa = undefined;
            alert('No autoritzat  ' + error.status)
            localStorage.clear();
            this.router.navigate(["/login"]);

          })
    }
    else {
      this.router.navigate(["/login"]);
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
    this.dades.inseririnci(this. token,this.titol,this.desc,this.todaysDataTime,this.prionum,this.estat)
    .subscribe((resultat)=>{
      console.log(resultat);
      this.ngOnInit();
    });
  }
  Eliminar(id){
    this.dades.eliminarinci(this.token,id).subscribe((resultat)=>{
    console.log(resultat);
      this.ngOnInit();
    });
  }
  Assignar(id,id1){
    this.dades.assignar(this.token,id,id1).subscribe((resultat) =>{
      console.log(resultat);
      this.ngOnInit();
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
