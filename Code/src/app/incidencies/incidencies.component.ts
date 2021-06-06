import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { collapseTextChangeRangesAcrossMultipleVersions, flattenDiagnosticMessageText, NumericLiteral } from 'typescript';
import { DadesService } from '../dades.service';


@Component({
  selector: 'app-incidencies',
  templateUrl: './incidencies.component.html',
  styleUrls: ['./incidencies.component.css']
})
export class IncidenciesComponent implements OnInit {
  @ViewChild('fileUploader') fileUploader: ElementRef;
  @ViewChild('selectoffcanvas') selectoffcanvas: ElementRef;
  @ViewChild('resetusuari') resetusuari: ElementRef;
  @ViewChild('resetprio') resetprio: ElementRef;

  page1 = 1;
  page2 = 1;
  page3 = 1;
  page4 = 1;
  pageSize = 15;
  p: number = 1;
  collection: any[];

  incidencies = [];
  ilenght: number;
  incidenciesO = [];
  ilenghto: number;
  incidenciesP = [];
  ilenghtp: number;
  inciO: number;
  incidenciesT = [];
  ilenghtt: number;
  inciP: number;
  tecnics = [];
  test = [];
  imatges = [];
  users = [];
  userinci: number;
  idI: number;
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

  toggleU: boolean;
  toggleT: boolean;
  toggleF: boolean;
  toggleP: boolean;
  toggleE: boolean;
  toggleI: boolean;

  prio = [
    { id: 1, prioritat: 'Baja' },
    { id: 2, prioritat: 'Media' },
    { id: 3, prioritat: 'Alta' }
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
          this.toggleU = false;
          this.toggleT = false;
          this.toggleF = false;
          this.toggleP = false;
          this.toggleE = false;
          this.toggleI = false;
          if (this.dades.tech == true) {
            this.dades.Mostrarusers(token).subscribe((resultat) => {
              this.users = resultat;
              console.log('usuaris: ', resultat);
            })
            this.dades.MostrarInci(token).subscribe((resultat) => {
              this.incidencies = resultat;
              console.log('incidències: ', resultat);
              this.ilenght = resultat.length;
              console.log("ilenght: ", this.ilenght)
            })
            this.dades.MostrarInciO(token, 1, 1).subscribe((resultat => {
              this.incidenciesO = resultat;
              this.ilenghto = resultat.length;
              console.log('incidències obertes:', resultat);
            }))
            this.dades.MostrarInciO(token, 2, 3).subscribe((resultat => {
              this.incidenciesP = resultat;
              this.ilenghtp = resultat.length;
              console.log('incidències progres:', resultat);
            }))
            this.dades.MostrarInciT(token).subscribe((resultat => {
              this.incidenciesT = resultat;
              this.ilenghtt = resultat.length;
              console.log('incidències tancades: ', resultat);
            }))
            this.dades.Mostrartecnic(token).subscribe((resultat => {
              this.tecnics = resultat;
              console.log('tècnics: ', resultat);
            }))
          } else {
            this.dades.MostrarInciu(token).subscribe((resultat) => {
              this.incidencies = resultat;
              this.ilenght = resultat.length;
              console.log(resultat);
            })
            this.dades.MostrarInciut(token).subscribe((resultat) => {
              this.incidenciesT = resultat;
              this.ilenghtt = resultat.length;
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
      console.log('userinci', this.userinci)
    }
    else {
      this.router.navigate(["/login"]);
    }
  }


  resoldre(id, ide) {
    console.log("yallah", id, ide)
    this.dades.resoldre(this.token, id, ide).subscribe((resultat) => {
      console.log(resultat);
    });
    this.ngOnInit();
  }
  techsel(event: any) {
    this.canvi = true;
    this.idt = event.target.value;
  }
  assignar(id, idp) {
    this.ide = 2;
    if (idp == "Baja") {
      this.idp = 1
    } else if (idp == "Media") {
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
    if (this.canvi && this.ide != 3) {
      this.ide = 2;
    }
    this.dades.actualitzar(this.token, id, this.idt, this.idp, this.ide).subscribe((resultat) => {
      console.log(resultat);
    })
    this.ngOnInit();
    this.canvi = false;
    this.selectoffcanvas.nativeElement.value = this.tecnic;

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
      console.log("tecnic", resultat[0].tecnic);
      this.tecnic = resultat[0].tecnic;
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
    if (this.titol != '' && this.desc != '') {
      if (!this.tech) {
        this.userinci = this.dades.idU;
      }
      if (this.tech && this.userinci == undefined || this.tech && this.userinci == null) {
        alert('Seleccione un usuario');
        return
      }
      if (this.idp == null) {
        this.idp = 1;
      }
      console.log('titol:', this.titol, 'iduser: ', this.userinci, 'priority: ', this.idp, 'desc: ', this.desc, 'img:', this.imatges);
      this.dades.inseririnci(this.token, this.titol, this.desc, this.userinci, this.idp, 1).subscribe((resultat) => {
        console.log('id_inci?:', resultat);
        //   this. idI = resultat;
        this.resetprio.nativeElement.value = 'Seleccionar prioridad';
        this.resetusuari.nativeElement.value = 'Seleccionar usuario';
      }),
        console.log('img ts: ', this.imatges);
      this.dades.inserir_fotosInci(this.token, this.userinci, this.imatges).subscribe((resultat) => {
        console.log('fotos?:', resultat);
        //  this. idI = resultat;

      });
      //  alert('oju');
      //  window.location.reload();
      this.ngOnInit();
    }
    else {
      alert('Complete la incidència')
    }
  }
  //selecció usuari
  usersel(event: any) {
    this.userinci = event.target.value;
  }
  //selecció prioritat
  priori(event: any) {
    this.idp = event.target.value;
  }
  sort(propietat, tab) {
    if (propietat == 'usuario') {
      if (this.toggleU == false) {
        this.toggleT = false;
        this.toggleF = false;
        this.toggleE = false;
        this.toggleP = false;
        this.toggleI = false;
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.Nom < b.Nom) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.Nom < b.Nom) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.Nom < b.Nom) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.Nom < b.Nom) ? -1 : 1);
          }
        this.toggleU = true;
      } else {
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.Nom > b.Nom) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.Nom > b.Nom) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.Nom > b.Nom) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.Nom > b.Nom) ? -1 : 1);
          }
        this.toggleU = false;
        this.toggleT = false;
        this.toggleF = false;
        this.toggleE = false;
        this.toggleP = false;
        this.toggleI = false;
      }
    }
    if (propietat == 'titulo') {
      if (this.toggleT == false) {
        this.toggleU = false;
        this.toggleF = false;
        this.toggleE = false;
        this.toggleP = false;
        this.toggleI = false;
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.titol < b.titol) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.titol < b.titol) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.titol < b.titol) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.titol < b.titol) ? -1 : 1);
          }
        this.toggleT = true;
      } else {
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.titol > b.titol) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.titol > b.titol) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.titol > b.titol) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.titol > b.titol) ? -1 : 1);
          }
        this.toggleT = false;
        this.toggleU = false;
        this.toggleF = false;
        this.toggleE = false;
        this.toggleP = false;
        this.toggleI = false;
      }
    }
    if (propietat == 'fecha') {
      if (this.toggleF == false) {
        this.toggleT = false;
        this.toggleU = false;
        this.toggleE = false;
        this.toggleP = false;
        this.toggleI = false;
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.Fecha < b.Fecha) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.Fecha < b.Fecha) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.Fecha < b.Fecha) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.Fecha < b.Fecha) ? -1 : 1);
          }
        this.toggleF = true;
      } else {
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.Fecha > b.Fecha) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.Fecha > b.Fecha) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.Fecha > b.Fecha) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.Fecha > b.Fecha) ? -1 : 1);
          }
        this.toggleF = false;
        this.toggleT = false;
        this.toggleU = false;
        this.toggleE = false;
        this.toggleP = false;
        this.toggleI = false;
      }
    }
    if (propietat == 'prioridad') {
      if (this.toggleP == false) {
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.pid < b.pid) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.pid < b.pid) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.pid < b.pid) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.pid < b.pid) ? -1 : 1);
          }
        this.toggleP = true;
        this.toggleT = false;
        this.toggleF = false;
        this.toggleE = false;
        this.toggleU = false;
        this.toggleI = false;
      } else {
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.pid > b.pid) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.pid > b.pid) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.pid > b.pid) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.pid > b.pid) ? -1 : 1);
          }
        this.toggleP = false;
        this.toggleT = false;
        this.toggleF = false;
        this.toggleE = false;
        this.toggleU = false;
        this.toggleI = false;
      }
    }
    if (propietat == 'estado') {
      if (this.toggleE == false) {
        this.toggleT = false;
        this.toggleF = false;
        this.toggleU = false;
        this.toggleP = false;
        this.toggleI = false;
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.eid < b.eid) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.eid < b.eid) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.eid < b.eid) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.eid < b.eid) ? -1 : 1);
          }
        this.toggleE = true;
      } else {
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.eid > b.eid) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.eid > b.eid) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.eid > b.eid) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.eid > b.eid) ? -1 : 1);
          }
        this.toggleE = false;
        this.toggleT = false;
        this.toggleF = false;
        this.toggleU = false;
        this.toggleP = false;
        this.toggleI = false;
      }
    }
    if (propietat == 'tecnico') {
      if (this.toggleI == false) {
        this.toggleT = false;
        this.toggleF = false;
        this.toggleE = false;
        this.toggleP = false;
        this.toggleU = false;
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.Nom < b.Nom) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.Nom < b.Nom) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.Ntecnic < b.Ntecnic) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.Nom < b.Nom) ? -1 : 1);
          }
        this.toggleI = true;
      } else {
        if (tab == 1) {
          this.incidencies.sort((a, b) => (a.Nom > b.Nom) ? -1 : 1);
        }
        if (tab == 2) {
          this.incidenciesO.sort((a, b) => (a.Nom > b.Nom) ? -1 : 1);
        }
        if (tab == 3) {
          this.incidenciesP.sort((a, b) => (a.Ntecnic > b.Ntecnic) ? -1 : 1);
        }
        if(tab == 4){
          this.incidenciesT.sort((a, b) => (a.Nom > b.Nom) ? -1 : 1);
          }
        this.toggleI = false;
        this.toggleT = false;
        this.toggleF = false;
        this.toggleE = false;
        this.toggleP = false;
        this.toggleU = false;
      }
    }
    console.log('estat toggle U: ', this.toggleU, 'T', this.toggleT, 'F', this.toggleF, 'P', this.toggleP, 'E', this.toggleE, 'I', this.toggleI);
    console.log('ordenar?', this.incidencies)
  }
}
