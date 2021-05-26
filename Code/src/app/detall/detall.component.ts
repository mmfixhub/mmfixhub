import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-detall',
  templateUrl: './detall.component.html',
  styleUrls: ['./detall.component.css']
})
export class DetallComponent implements OnInit {
  @ViewChild('respondreinci') respondreinci: ElementRef;
  @ViewChild('fileUploader') fileUploader: ElementRef;

  incidencia = [];
  incilin = [];
  fotos = [];
  imatges = [];
  idinci: string;
  resposta: string;
  netxlin: number;
  constructor(public router: ActivatedRoute, public route: Router, public dades: DadesService,config: NgbCarouselConfig) {
    config.interval = 10000;
    config.wrap = false;
    config.keyboard = true;
    config.pauseOnHover = true;
   }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
    this.dades.obtenirtipus(token)
      .subscribe((resp) => {
        if (resp) {
          this.incidencia = [];
          console.log("usuari: ", resp);
          this.dades.idU = resp.id;
          this.dades.tech = resp.tech;
          this.dades.admin = resp.admin;
          this.dades.empresa = resp.empresa;
          this.dades.login = true;
          this.dades.username = resp.nom + ' ' + resp.cognoms;
          this.idinci = this.router.snapshot.paramMap.get("id");
          this.dades.MostrarDetall(token, this.idinci).subscribe((resultat) => {
            this.incidencia = resultat;
            console.log('inci: ',resultat);
          });
          this.dades.MostrarDetallLin(token, this.idinci).subscribe((resultat) => {
            this.incilin = resultat;
            console.log('incilin: ', resultat);
            this.netxlin = resultat.length+1;
            console.log('nextlin?: ', this.netxlin);
          });
          this.dades.MostrarFotos(token, this.idinci).subscribe((resultat) => {
            this.fotos = resultat;
            console.log('fotos', resultat);
          });
        }


      }, (error) => {
        this.dades.idU = undefined;
        this.dades.tech = undefined;
        this.dades.admin = undefined;
        this.dades.empresa = undefined;
        this.dades.login = false;
        alert('No autoritzat  ' + error.status)
        localStorage.clear();
        this.route.navigate(["/login"]);
      }
      )
  }
  enviar() {
    this.dades.inciresposta(localStorage.getItem('token'), this.resposta, this.idinci, this.dades.idU).subscribe((resultat) => {
      console.log('resp: ', resultat);
      if(this.dades.tech){
        this.dades.resoldre(localStorage.getItem('token'),this.idinci,3).subscribe((resultat) =>{
          console.log('esta incidència: ',resultat);
          if(this.imatges.length != 0){
          this.dades.inserir_fotosLin(localStorage.getItem('token'), this.idinci,this.netxlin, this.imatges).subscribe((resultat) => {
            console.log('fotos?:', resultat);
            //  this. idI = resultat;
          });
          }
        })
      }else{
        this.dades.resoldre(localStorage.getItem('token'),this.idinci,2).subscribe((resultat) =>{
          console.log('esta incidència: ',resultat);
          if(this.imatges.length != 0){
          this.dades.inserir_fotosLin(localStorage.getItem('token'), this.idinci,this.netxlin, this.imatges).subscribe((resultat) => {
            console.log('fotos?:', resultat);
            //  this. idI = resultat;
          });
        }
        })
      }
      this.respondreinci.nativeElement.value = null;
      this.ngOnInit();
    });
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
}
