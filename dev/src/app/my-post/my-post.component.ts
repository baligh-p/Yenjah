import { Component, OnInit , OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../app.service';
import { CustomizingDate } from '../home/customizingDates';
@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent implements OnInit {

  constructor(private route : Router , private cookie : CookieService , private appService : AppService ) {}

  ngOnInit(): void {
    this.checkUserConnected()
    this.getPosts()
  }
  posts : any
  currentData :any
  checkUserConnected(){
    if(!this.cookie.check("clid"))
    {
      this.route.navigate(["/"])
    }
  }
  selectPost(selectedPost  : any){
    this.currentData=selectedPost
  }
  magicDates=new CustomizingDate()
  changeDate(date : string){
    return this.magicDates.UseDate(date)
  }
  getPosts(){
    this.appService.getData(`/myPost?clid=${this.cookie.get("clid")}`).then((res)=>{
      this.posts=res.data
      this.currentData=this.posts[0]
    })
  }
}
