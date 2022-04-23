import { Component, OnInit , Input } from '@angular/core';
import { CustomizingDate } from '../home/customizingDates';
import {CookieService} from "ngx-cookie-service"
import { AppService } from '../app.service';
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
  getProfile(){
    if(this.cookies.check("clid"))
    {
      this.appService.getData(`/getUser.php?clid=${this.cookies.get("clid")}`).then((res)=>{
        this.user=res.data
      })
    }
  }
  comment=""
  handleSubmitComment(idPost:string){
    if(this.comment.length!==0&&this.cookies.check("clid"))
    {
      var data=new FormData() 
      data.append("idProfile",this.cookies.get("clid"))
      data.append("idPost",idPost)
      data.append("text",this.comment) 
      this.appService.sendData("/commentaire.php",data)
    }
  }
  showComment=false
  showComments(){
    this.showComment=!this.showComment
  }
  magicDates=new CustomizingDate()
  changeDate(date : string){
    return this.magicDates.UseDate(date)
  }
  @Input() usersData : any
  @Input() loading : any
}
