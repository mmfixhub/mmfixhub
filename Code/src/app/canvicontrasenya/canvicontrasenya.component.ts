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
    this.dades.needemail(this.email).subscribe((resultat) =>{
      console.log(resultat);
    });
  }
}
