import { Component, OnInit  } from '@angular/core';
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
  showCreate =true
  posts :any
  currentData :any
  filter="alphaD"
  noPosts=false
  closeModifing =true
  closeModify(){
    this.closeModifing=true
  }
  checkUserConnected(){
    if(!this.cookie.check("clid"))
    {
      this.route.navigate(["/"])
    }
  }
  selectPost(selectedPost  : any){
    this.currentData=selectedPost
    this.closeModifing=false
  }
  magicDates=new CustomizingDate()
  changeDate(date : string){
    return this.magicDates.UseDate(date)
  }
  handleFilter(){
    if(this.filter==="alphaC")
    {
    this.posts.sort((a : any,b : any)=>{
      if(a.titre[0]>b.titre[0])
      {
        return 1
      }
      else if(a.titre[0]<b.titre[0])
      {
        return -1
      }
      return 0
    })
    }
    else if(this.filter==="alphaD")
    {
      this.posts.sort((a : any,b : any)=>{
      if(a.titre[0]>b.titre[0])
      {
        return -1
      }
      else if(a.titre[0]<b.titre[0])
      {
        return 1
      }
      return 0
    })
    }
  }
  getPosts(){
    this.appService.getData(`/myPost?clid=${this.cookie.get("clid")}`).then((res)=>{
      this.posts=res.data
      this.showCreate=res.data.length
      if(res.data!=undefined) this.currentData=res.data[0]
    })
  }
  handleDeletePost(id : string){
    const data={
      idPost:id
    }
    this.appService.sendData("/deletePost.php",data).then((res)=>{
      this.getPosts()
    })
  }
}
