import { Component, OnInit , Input } from '@angular/core';
import { CustomizingDate } from '../home/customizingDates';
import {CookieService} from "ngx-cookie-service"
import { AppService } from '../app.service';
import { elementAt } from 'rxjs';
@Component({
  selector: 'app-post-cards',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  constructor( private cookies : CookieService , private appService : AppService) { }
  connected=this.cookies.check("clid")
  ngOnInit(): void {
    this.getProfile()
  }
  user : any
  showComment=""
  showComments(idPost : any){
    if(!this.showComment&&this.connected) this.showComment=idPost
    else this.showComment=""
  }
  magicDates=new CustomizingDate()
  changeDate(date : string){
    return this.magicDates.UseDate(date)
  }
  getProfile(){
    if(this.cookies.check("clid"))
    {
      this.appService.getData(`/getUser.php?clid=${this.cookies.get("clid")}`).then((res)=>{
        this.user=res.data
      })
    }
  }
  decisions =[
    {
      username:"baligh", 
      photo:"icons/darius.jpg",
      decision:"take"
    },
    {
      username:"baligh", 
      photo:"icons/darius.jpg",
      decision:"leave"
    }
  ]
  showDecision=true
  showDecisions(){
    this.showDecision=!this.showDecision
  }
  makeDecision(decision : string,idPost : string){
    this.usersData.forEach((element : any) => {
      if(element.idPost===idPost)
      {
        if(element.decision==decision) element.decision=""
        else element.decision=decision
      }
    });
    if(this.cookies.check("clid"))
    {
      var data=new FormData()
      data.append("idProfile",this.cookies.get("clid"))
      data.append("idPost",idPost)
      data.append("decision",decision)
      this.appService.sendData("/decision.php",data)
    }
  }
  @Input() usersData : any
  @Input() loading : any
}
