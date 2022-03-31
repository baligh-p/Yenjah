import { Component, OnInit } from '@angular/core';

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
  showBurger = true;
  handleBurgerClick(){
    this.showBurger=!this.showBurger
  }
}
