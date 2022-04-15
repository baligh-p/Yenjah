import { Component, OnInit ,OnDestroy } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy  {

  constructor(private appService : AppService) { }

  ngOnInit(): void {
    this.getUsers()
  }
  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
  loadingForPosts=false
  interval : any
  getUsers(){
    this.interval=setInterval(()=>{
       this.loadingForPosts=true
      this.appService.getData("/getPost.php?generalType=informatique").then((res)=>{
      this.usersData=res.data
      this.loadingForPosts=false
    })
    },3000)
  }
  usersData=[]
}
