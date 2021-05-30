import { Component, OnInit } from '@angular/core';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-canvicontrasenya',
  templateUrl: './canvicontrasenya.component.html',
  styleUrls: ['./canvicontrasenya.component.css']
})
export class CanvicontrasenyaComponent implements OnInit {
email:string
  constructor(private dades:DadesService) { }

  ngOnInit(): void {
  }
  test(){
    if(this.email == undefined || this.email == ''|| !this.email.includes('@')){
      alert('introduzca un email');
      
    }else{
    this.dades.needemail(this.email.toLocaleLowerCase()).subscribe((resultat) =>{
      alert(resultat.missatge);
    });}
  }
}
