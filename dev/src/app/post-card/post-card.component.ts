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
  handleSubmitComment(){
    
  }
  magicDates=new CustomizingDate()
  changeDate(date : string){
    return this.magicDates.UseDate(date)
  }
  @Input() usersData : any
  @Input() loading : any
}
