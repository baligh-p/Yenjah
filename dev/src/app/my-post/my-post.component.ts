import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {

  constructor(private route : Router , private cookie : CookieService ) { }

  ngOnInit(): void {
    this.checkUserConnected()
  }
  checkUserConnected(){
    if(!this.cookie.check("clid"))
    {
      this.route.navigate(["/"])
    }
  }
  post={
    titre:"Titre de post" , 
    photo:"/assets/icons/darius.jpg" , 
    text:"lorem lorem lorem lorem lorem lorem loremlorem lorem lorem lorem lorem lorem lorem lorem loremlorem loremlorem lorem lorem lorem lorem lorem loremlorem lorem" , 
    dateCreate:"2020-20-20 20:20" , 
    typeGeneral:"informatique" , 
    typeSpecifique:"Souris" , 
    objective:"help"
  }
}
