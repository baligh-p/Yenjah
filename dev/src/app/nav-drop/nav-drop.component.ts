import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-drop',
  templateUrl: './nav-drop.component.html',
  styleUrls: ['./nav-drop.component.scss']
})
export class NavDropComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() show=false
  @Input() userData  : any
  logOut(){
    
  }
}
