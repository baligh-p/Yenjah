import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css',"./nav.scss"]
})
export class NavComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }
  showBurger = true
  isConnected=false
  show =false
  handleBurgerClick(){
    this.showBurger=!this.showBurger
  }
  userData={
    photo:"/assets/icons/user.png", 
    username:"flen"
  }
  handle_Hide_Show(){
    this.show=!this.show
  }
  logOut(){
    alert("log out")
  }
}
