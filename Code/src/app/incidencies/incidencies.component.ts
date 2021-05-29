import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DadesService } from '../dades.service';
import { DetallComponent } from '../detall/detall.component';


@Component({
  selector: 'app-incidencies',
  templateUrl: './incidencies.component.html',
  styleUrls: ['./incidencies.component.css']
})
export class IncidenciesComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef;
  @ViewChild('resetusuari') resetusuari: ElementRef;
  @ViewChild('resetprio') resetprio: ElementRef;
  page = 1;
  pageSize =15;
  p: number = 1;
  collection: any[];

  incidencies = [];
  incidenciesO = [];
  inciO: number;
  incidenciesT = [];
  inciP: number;
  tecnics = [];
  test = [];
  imatges = [];
  users = [];
  userinci:number;
  idI:number;
  incidencia = [];
  id: number;
  tech: boolean;
  tecnic: string;
  idt: number;
  idp: number;
  ide: number;
  canvi: boolean;
  todaysDataTime = '';
  searchText: string;
  prior: string;


  prio = [
    { id: 1, prioritat: 'Low' },
    { id: 2, prioritat: 'Medium' },
    { id: 3, prioritat: 'High' }
  ]
  titol: string;
  desc: string;
  estat: number;
  token: string;
  prioritat: any;

  constructor(private dades: DadesService, public router: Router) {

  }
  ngOnInit(): void {
    this.titol = '';
    this.desc = '';
    this.imatges = []

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
            this.dades.login = true;
          }
          console.log(this.dades.idU)
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
            this.dades.login = false;
            alert('No autoritzat  ' + error.status)
            localStorage.clear();
            this.router.navigate(["/login"]);

          })
    }
    else {
      this.router.navigate(["/login"]);
    }
  }

  Alta() {
    this.prioritat = "High";
    this.idp = 3;
  }
  Mitja() {
    this.prioritat = "Medium";
    this.idp = 2;
  }
  Baixa() {
    this.prioritat = "Low";
    this.idp = 1;
  }
  resoldre(id, ide) {
    console.log("yallah", id, ide)
    this.dades.resoldre(this.token, id, ide).subscribe((resultat) => {
      console.log(resultat);
    });
    this.ngOnInit();
  }
  Atecnic(tecnic, id) {
    if (this.idt == null) {
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
    this.dades.actualitzar(this.token, id, this.idt, this.idp, this.ide).subscribe((resultat) => {
      console.log(resultat);
    })
    this.ngOnInit();
    this.canvi = false;
  }
  editarinci(id) {
    this.dades.editinci(this.token, id).subscribe((resultat) => {
      console.log(resultat);
      this.incidencia = resultat;
      this.idt = resultat[0].id_IT;
      console.log("idt", this.idt)
      this.prioritat = resultat[0].prioritat;
      console.log("prioritat", this.prioritat)
      this.idp = resultat[0].idp;
      console.log("idp", this.idp);
      this.ide = resultat[0].estat;
      console.log("ide", this.ide);
      if (this.idt == null) {
        this.tecnic = "Click to Assign"
      } else {
        this.tecnic = resultat[0].tecnic;
      }
    })
  }
  //funcions image-cropper
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
  //guarda imatges dins array
  img() {
    if (this.croppedImage != "") {
      this.imatges[this.imatges.length] = { id: this.imatges.length, imatge: this.croppedImage };
      this.croppedImage = "";
      this.imageChangedEvent = null;
      this.fileUploader.nativeElement.value = null;
      console.log('imatges: ', this.imatges);
    }
  }
  //delete d'imatges dins l'array & reindexa 
  delete(id) {
    this.imatges.splice(id, 1);
    console.log('imatges: ', this.imatges);

  }
  //insert de incidencies & fotos 
  inseririnci_fotos() {
    if(!this.tech){
      this.userinci = this.dades.idU;
    }
    console.log('titol:', this.titol, 'iduser: ', this.userinci, 'priority: ', this.idp, 'desc: ', this.desc, 'img:', this.imatges);
    this.dades.inseririnci(this.token, this.titol, this.desc, this.userinci, this.idp, 1).subscribe((resultat) => {
      //  console.log('id_inci?:',resultat);
      //   this. idI = resultat;
      this.resetprio.nativeElement.value = 'Seleccionar prioridad';
      this.resetusuari.nativeElement.value = 'Seleccionar usuario';
    })
    this.dades.inserir_fotosInci(this.token, this.userinci, this.imatges).subscribe((resultat) => {
      console.log('id_inci?:', resultat);
      //  this. idI = resultat;
      this.imatges = [];
    });;
    //  alert('oju');
    //  window.location.reload();
    this.ngOnInit();
   }
  //selecció usuari
  usersel(event: any) {
    this.userinci = event.target.value;
  }
  //selecció prioritat
  priori(event: any) {
    this.idp = event.target.value;
  }
}
