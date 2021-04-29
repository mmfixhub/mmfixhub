import { Component, OnInit } from '@angular/core';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  login:boolean
  constructor(private dades:DadesService){ }

  ngOnInit(): void {
    
  }

  logout(){
    localStorage.clear();
    this.login= false;
  }
}
