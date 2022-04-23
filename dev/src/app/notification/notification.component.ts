import { Component, OnInit , Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private cookies : CookieService) { }

  ngOnInit(): void {
    this.cookies.set("session","register")
  }
  connected=this.cookies.check("clid")
  show=!this.cookies.check("session")
  hideNot(){
    this.show=!this.show
  }
}
