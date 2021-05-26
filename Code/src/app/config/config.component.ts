import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  token: string;
  person = [];
  nom:string;
  cognoms:string;
  telefon:number;
  email:string;
  password:string;
  password1:string;
  password2:string;
  tech:boolean;
  imatges: any;
  idg:number;

  constructor(private dades: DadesService, public route: Router) { }

  ngOnInit(): void {
      if (localStorage.getItem('token')) {
        this.token = localStorage.getItem('token');
        var token = localStorage.getItem('token');
        this.dades.obtenirtipus(token)
          .subscribe((resp) => {
            if (resp) {
              console.log(resp);
              this.dades.idU = resp.id;
              this.dades.tech = resp.tech;
              this.dades.admin = resp.admin;
              this.dades.empresa = resp.empresa;
              this.dades.username = resp.nom + ' '+ resp.cognoms;
              this.dades.login = true;
              this.tech = this.dades.tech;
            }
              this.dades.Mostraruserd(this.token,this.dades.idU).subscribe((resultat)=>{
                console.log('info user: ',resultat);
                this.person = resultat; //this is not loading any image ma meeen
                this.idg = resultat[0].id_grup;
              });
          },
            (error) => {
              this.dades.idU = undefined;
              this.dades.tech = undefined;
              this.dades.admin = undefined;
              this.dades.empresa = undefined;
              alert('No autoritzat  ' + error.status)
              localStorage.clear();
              this.dades.route.navigate(["/login"]);
  
            })
      }
      else {
        this.route.navigate(["/login"]);
  
      }
    }
    updateuser(){
      if(this.nom == null){
        this.nom = this.person[0].Nom;
      }
      if(this.cognoms == null){
        this.cognoms = this.person[0].Cognoms;
      }
      if(this.telefon == null){
        this.telefon = this.person[0].Telefon_empresa;
      }
      if(this.email == null){
        this.email = this.person[0].Email;
      }
      console.log(this.nom);
      console.log(this.cognoms);
      console.log(this.email);
      console.log(this.dades.idU);
      this.dades.updateuser(this.token,this.dades.idU,this.nom,this.cognoms,this.telefon,this.email,this.idg).subscribe((resultat)=>{
          console.log(resultat);
          this.ngOnInit();
        })
      this.nom = null;
      this.cognoms = null;
      this.telefon = null;
      this.email = null;

    }
    guardarfoto(){
      this.dades.updatefoto(this.token,this.dades.idU,this.croppedImage).subscribe((resultat=>{
        console.log("img",resultat);
        this.ngOnInit();
      }))
    }
    canviarcontrasenya(){
      if(this.password1 == this.password2){
        this.dades.passwordset(this.token,this.password,this.password1).subscribe((resultat)=>{
          console.log(resultat);
        })
      }
      
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


