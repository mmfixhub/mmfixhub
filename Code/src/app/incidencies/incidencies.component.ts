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
  p: number = 1;
  collection: any[];

  incidencies = [];
  incidenciesO = [];
  incidenciesT = [];
  inciO: number;
  inciP: number;
  tecnics = [];

  incidencia = [];
  id : number;
  tech:boolean;
  tecnic:string;
  userinci:string;
  idt:number;
  idp:number;
  ide:number;
  canvi:boolean;
  users = [];
  imatges = [];
  todaysDataTime = '';
  searchText: string;
  prior:string;

  prioritat = [
    { id: 1, prioritat: 'Low' },
    { id: 2, prioritat: 'Medium' },
    { id: 3, prioritat: 'High' }
  ]
  titol: string;
  desc: string;
  estat: number;
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
          if (this.dades.tech == true) {
            this.dades.Mostrarusers(token).subscribe((resultat) => {
              this.users = resultat;
              console.log('usuaris: ', resultat);
            })
            this.dades.MostrarInci(token).subscribe((resultat) => {
              this.incidencies = resultat;
              console.log('incidències: ', resultat);
            })
            this.dades.MostrarInciO(token).subscribe((resultat => {
              this.incidenciesO = resultat;
              console.log('incidències obertes:', resultat);
            }))
            this.dades.MostrarInciT(token).subscribe((resultat => {
              this.incidenciesT = resultat;
              console.log('incidències tancades: ', resultat);
            }))
            this.dades.Mostrartecnic(token).subscribe((resultat => {
              this.tecnics = resultat;
              console.log('tècnics: ', resultat);
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
    this.prior = "High";
    this.idp = 3;
  }
  Mitja(){
    this.prior = "Medium";
    this.idp = 2;
  }
  Baixa(){
    this.prior = "Low";
    this.idp = 1;
  }

  Guardar(){
    this.dades.inseririnci(this.token,this.titol,this.desc,this.todaysDataTime,this.idp,this.estat)
    .subscribe((resultat)=>{
      console.log(resultat);
    });
  }
  Eliminar(id){
    this.dades.eliminarinci(this.token,id).subscribe((resultat)=>{
    console.log(resultat);
    });
  }
  Assignar(id, id1) {
    this.dades.assignar(this.token, id, id1).subscribe((resultat) => {
      console.log(resultat);
    })
  }
  
  resoldre(id, ide) {
    console.log("yallah", id, ide)
    this.dades.resoldre(this.token, id, ide).subscribe((resultat) => {
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
  assignar(id, idp) {
    this.ide = 2;
    if (idp == "Low") {
      this.idp = 1
    } else if (idp == "Medium") {
      this.idp = 2
    } else {
      this.idp = 3
    }
    this.dades.actualitzar(this.token, id, this.dades.idU, this.idp, this.ide).subscribe((resultat) => {
      console.log(resultat);
    })
    this.ngOnInit();
  }
  Actualitzar(id) {
    if (this.canvi) {
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
  img() {
    if (this.croppedImage != "") {
      this.imatges[this.imatges.length] = { id: this.imatges.length, imatge: this.croppedImage };
      this.croppedImage = "";
      this.imageChangedEvent = '';
      console.log('imatges: ', this.imatges);
    }
  }
  testi() {
    console.log('titol:', this.titol, 'iduser: ', this.userinci, 'priority: ', this.idp, 'desc: ', this.desc, 'img:', this.imatges);
    this.dades.inseririnci(this.token, this.titol, this.desc, Date.now(), this.idp, 1).subscribe((resultat) => {
      console.log(resultat);
    });
    for (let i = 0; i < this.imatges.length; i++) {

    }
  }

  usersel(event: any) {
    this.userinci = event.target.value;
  }
  priori(event: any) {
    this.idp = event.target.value;
  }
}
