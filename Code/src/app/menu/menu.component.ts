import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  login:boolean;
  constructor(){ }

  ngOnInit(): void {
    var token = localStorage.getItem(token);
    if(localStorage.getItem(token)){
      this.login = true;
    }else{
      this.login = false;
    }
  }

  logout(){
    localStorage.clear();
    this.ngOnInit();
  }
}
