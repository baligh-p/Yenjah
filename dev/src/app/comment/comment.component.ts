import { Component, OnInit ,Input , OnDestroy} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../app.service';
import {CustomizingDate} from "../home/customizingDates"
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit ,  OnDestroy {

  constructor(private appService :AppService , private cookies : CookieService) { }

  ngOnInit(): void {
    this.getComments()
  }
  ngOnDestroy(): void {
   clearInterval(this.cleanup)
  }
  @Input() id : any
  @Input() show : any
  magicDates=new CustomizingDate()
  comments : any
  commentValue=""
  changeDate(date : string){
    return this.magicDates.UseDate(date)
  }
  cleanup :any
  getComments(){
    this.cleanup=setInterval(()=>{
      this.appService.getData(`/commentaire.php?idPost=${this.id}`).then((res)=>{
        this.comments=res.data
      })
    },3000)
  }
  @Input() user  : any 
  handleSubmitComment()
  {
    if(this.commentValue.length>0)
    {
      var data=new FormData()
      data.append("idProfile",this.cookies.get("clid"))
      data.append("idPost",this.id) 
      data.append("text",this.commentValue)
      this.appService.sendData("/commentaire.php",data).then(()=>{
        this.commentValue=""
      })
    }
  }
}
