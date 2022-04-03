import { Component, OnInit, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-drop',
  templateUrl: './nav-drop.component.html',
  styleUrls: ['./nav-drop.component.scss']
})
export class NavDropComponent implements OnInit {

  constructor(private  cookies :  CookieService) { }

  ngOnInit(): void {
  }
  @Input() show=false
  @Input() userData  : any
  logOut(){
    this.cookies.delete("clid")
    window.location.reload()
  }
}
