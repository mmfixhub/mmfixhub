import { Component, OnInit } from '@angular/core';
import { DadesService } from '../dades.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  login:boolean;
  constructor(public dades: DadesService){ }

  ngOnInit(): void {
    this.login = true;
    var token = localStorage.getItem(token);
    if(localStorage.getItem(token)){
      this.dades.login = true;
      this.login = this.dades.login;
      this.login = true;
    }else{
      this.dades.login = false;
      this.login = this.dades.login;
    }
    console.log('login',this.login);
  }

  logout(){
    localStorage.clear();
    this.ngOnInit();
  }
}
