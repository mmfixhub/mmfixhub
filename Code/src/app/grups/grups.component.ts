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
  admin:boolean;
  nom: string;
  cognoms: string;
  empresa: number;
  telefon: string;
  email: string;
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
    if(this.email != "" && this.password != ""){
      this.dades.newuser(this.token, this.nom, this.cognoms, this.empresa, this.telefon, this.email, this.password,tipus).subscribe((resultat)=>{
        console.log(resultat);
        this.ngOnInit();
      });
    }
    this.nom = "";
    this.cognoms = "";
    this.telefon = "";
    this.password = "";
    this.empresa = 0;
    this.email = "";
    
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
      this.empresa = resultat[0].id_grup;
    })
  }
  updateuser(id){
    console.log("Updating: ",id,this.empresa,this.email);
    this.dades.updateuser(this.token,id,this.email,this.empresa).subscribe((resultat)=>{
      console.log(resultat);
      this.ngOnInit();
      console.log("Updated");
    })
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
  }


}
