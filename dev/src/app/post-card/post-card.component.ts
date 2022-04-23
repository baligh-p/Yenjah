import { Component, OnInit , Input } from '@angular/core';
import { CustomizingDate } from '../home/customizingDates';
import {CookieService} from "ngx-cookie-service"
import { AppService } from '../app.service';;
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
  decisions : any
  customDecisions: any
  DecisionCheck = "all"
  showDecision=false
  check(check : string){
    this.DecisionCheck=check
    if(check==="all")
    {
      this.customDecisions=this.decisions
    }
    else if(check==="take")
    {
      this.customDecisions=this.decisions.filter((res:any)=>res.decision==="1")
    }
    else
    {
      this.customDecisions=this.decisions.filter((res:any)=>res.decision==="0")
    }
  }
  getDecisions(id : string){
    this.appService.getData(`/decision.php?idPost=${id}`).then((res)=>{
      this.decisions=res.data
      this.customDecisions=res.data
    })
  }
  showDecisions(id : string){
    this.showDecision=!this.showDecision
    if(this.showDecision)
    {
      this.getDecisions(id)
    }
  }
  makeDecision(decision : string,idPost : string){
    this.usersData.forEach((element : any) => {
      if(element.idPost===idPost&&this.cookies.check("clid"))
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
