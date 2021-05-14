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
  inciO:number;
  incidenciesT = [];
  inciP:number;
  tecnics = [];

  incidencia = [];
  id : number;
  tech:boolean;
  tecnic:string;
  idt:number;
  idp:number;
  ide:number;
  canvi:boolean;


  prioritat = "Low";
  titol:string;
  desc:string;
  estat:number;
  token: string;
  constructor(private dades: DadesService, public router: Router) {

  }


  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      var token = localStorage.getItem('token');
      this.token = localStorage.getItem('token');
      this.dades.obtenirtipus(token)
        .subscribe((resp) => {
          if (resp) {
            console.log("aaaa: ", resp);
            this.dades.idU = resp.id;
            this.dades.tech = resp.tech;
            this.tech = this.dades.tech;
            this.dades.admin = resp.admin;
            this.dades.empresa = resp.empresa;
          }
          console.log(this.dades.idU)
          if (this.dades.tech == true) {
            this.dades.MostrarInci(token).subscribe((resultat) => {
              this.incidencies = resultat;
              console.log(resultat);
            })
            this.dades.MostrarInciO(token).subscribe((resultat => {
              this.incidenciesO = resultat;
              console.log(resultat);
            }))
            this.dades.MostrarInciT(token).subscribe((resultat => {
              this.incidenciesT = resultat;
              console.log(resultat);
            }))
            this.dades.Mostrartecnic(token).subscribe((resultat => {
              this.tecnics = resultat;
              console.log(resultat);
            }))
          } else {
            this.dades.MostrarInciu(token).subscribe((resultat) => {
              this.incidencies = resultat;
              console.log(resultat);
            })
            this.dades.MostrarInciut(token).subscribe((resultat) => {
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
  resoldre(id,ide){
    console.log("yallah",id,ide)
    this.dades.resoldre(this.token,id,ide).subscribe((resultat) =>{
      console.log(resultat);
    });
    this.ngOnInit();
  }
  Atecnic(tecnic,id){
    if(this.idt == null){
      this.canvi = true;
    }
    this.tecnic = tecnic;
    this.idt = id;
  }
  assignar(id,idp){
    this.ide = 2;
    if(idp == "Low"){
      this.idp = 1
    }else if(idp == "Medium"){
      this.idp = 2
    }else{
      this.idp = 3
    }
    this.dades.actualitzar(this.token,id,this.dades.idU,this.idp,this.ide).subscribe((resultat) =>{
      console.log(resultat);
    })
    this.ngOnInit();
  }
  Actualitzar(id){
    if(this.canvi){
      this.ide = 2;
    }
    this.dades.actualitzar(this.token,id,this.idt,this.idp,this.ide).subscribe((resultat) =>{
      console.log(resultat);
    })
    this.ngOnInit();
    this.canvi = false;
  }
  editarinci(id){
    this.dades.editinci(this.token,id).subscribe((resultat) =>{
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
