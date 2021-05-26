import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-grups',
  templateUrl: './grups.component.html',
  styleUrls: ['./grups.component.css']
})
export class GrupsComponent implements OnInit {
  users = [];
  person = [];
  grups = [];
  grup = [];
  admin:boolean;
  nom: string;
  cognoms: string;
  empresa: number;
  telefon: string;
  email: string;
  email2: string;
  password: string;
  token: string;
  constructor(private dades:DadesService,  public router: Router) {}

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
            this.dades.admin = resp.admin;
            this.admin = this.dades.admin;
            this.dades.empresa = resp.empresa;
            this.dades.login = true;
          }
          console.log(this.dades.idU)
          this.dades.Mostrarusers(token).subscribe((resultat)=>{
            this.users = resultat;
            console.log(resultat);
          });
          this.dades.Mostrargrups(token).subscribe((resultat)=>{
            this.grups = resultat;
            console.log(resultat);
          });
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

  newuser(tipus){
    if(tipus == 1){
      this.empresa = 0;
    }
    console.log("awiaitng confirmació",this.email);
    this.email2 = this.email;
    if(this.email != ""){
      this.dades.newuser(this.token, this.nom, this.cognoms, this.empresa, this.telefon, this.email,tipus).subscribe((resultat)=>{
        console.log(resultat);
        console.log("enviant confirmació",this.email2);
        this.dades.needemail(this.email2).subscribe((resultat) => {
          console.log(resultat);
          this.ngOnInit();
        })
      });
    }
    
    this.nom = null;
    this.cognoms = null;
    this.telefon = null;
    this.password = null;
    this.empresa = 0;
    this.email = null;
    
  }
  newgroup(){
    if(this.nom != ""){
      this.dades.newgroup(this.token,this.nom).subscribe((resultat)=>{
        console.log(resultat);
    })
      this.nom = "";
      this.ngOnInit();
    }
  }
  mostraruserd(id){
    this.dades.Mostraruserd(this.token,id).subscribe((resultat)=>{
      console.log(resultat);
      this.person = resultat;
    })
  }
  mostrargrupsd(id){
    this.dades.Mostrargrupsd(this.token,id).subscribe((resultat)=>{
      console.log(resultat);
      this.grup = resultat;
    })
  }
  updategrup(id){
    if(this.nom == null){
      this.nom = this.grup[0].Grup;
    }
    console.log(id,this.nom);
    this.dades.Updategrup(this.token,id,this.nom).subscribe((resultat)=>{
      console.log(resultat);
      this.ngOnInit();
    })
    this.nom = null;
  }
  deletegrup(id){
    this.dades.Deletegrup(this.token,id).subscribe((resultat)=>{
      console.log(resultat);
      this.ngOnInit();
    })
  }
  updateuser(id){
    console.log("Updating: ",id,this.empresa,this.email);
    this.nom = this.person[0].Nom;
    this.cognoms = this.person[0].Cognoms;
    this.telefon = this.person[0].Telefon_empresa;
    if(this.email == null){
      this.email = this.person[0].Email;
    }
    this.dades.updateuser(this.token,id,this.nom,this.cognoms,this.telefon,this.email,this.empresa).subscribe((resultat)=>{
      console.log(resultat);
      this.ngOnInit();
      console.log("Updated");
    })
    this.nom = null;
    this.cognoms = null;
    this.telefon = null;
    this.email = null;
  }
  deleteuser(id){
    console.log("Deleting",id)
    this.dades.deleteuser(this.token,id).subscribe((resultat)=>{
      console.log(resultat);
      console.log("Deleted")
      this.ngOnInit();
    })
  }
  selectChangeHandler (event: any) {
    this.empresa = event.target.value;
    console.log(this.empresa,this.email)
  }


}
