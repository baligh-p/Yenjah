import { Component, OnInit ,OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appService : AppService, private cookies : CookieService) { }

  ngOnInit(): void {
    this.getPosts()
  }
  loadingForPosts=false
  interval : any
  usersData=[]
  getPosts(){
      this.loadingForPosts=true
      var idProfileIfExist=this.cookies.get("clid") ||  ""
      this.appService.getData(`/getInitPost.php?generalType=informatique&idProfile=${idProfileIfExist}`).then((res)=>{
      this.usersData=res.data
      this.loadingForPosts=false
    })
  }
}
