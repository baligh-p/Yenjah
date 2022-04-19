import { Component , OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {CookieService} from "ngx-cookie-service";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css',"./nav.scss"]
})
export class NavComponent implements OnInit {

  constructor(private appService : AppService, private cookies : CookieService ) {
  }

  ngOnInit(): void {
    this.checkUserConnected()
    this.verifyPath()
  }

  showBurger = true
  showFilter=false
  isConnected=false
  showCreatePostIcon : any 
  show =false
  userData={
    username:"", 
    photo:"/assets/icons/user.png", 
    email:""
  }
  closeNav(){
    this.showBurger=true
  }
  verifyPath(){
    if(window.location.pathname.indexOf("create-Post")===-1 && this.isConnected) this.showCreatePostIcon=true 
    else this.showCreatePostIcon=false
  }
  handleBurgerClick(){
    this.showBurger=!this.showBurger
  }
  show_filter(){
    this.showFilter=!this.showFilter
  }
  async checkUserConnected(){
    if(this.cookies.check("clid"))
    {
      this.isConnected=true
      var url=`/getUser.php?clid=${encodeURIComponent(this.cookies.get("clid"))}`
      await this.appService.getData(url).then((res)=>{
        this.userData={
          username:res.data.username,
          photo:res.data.photo!=null ? "./assets/"+res.data.photo :  "/assets/icons/user.png", 
          email:res.data.email
        }
      })
    }
  }
  handle_Hide_Show(){
    this.show=!this.show
  }
  logOut(){
    this.cookies.delete("clid")
    window.location.reload()
  }
}
