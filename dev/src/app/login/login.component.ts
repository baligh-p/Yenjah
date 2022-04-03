import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from '../app.service';
import { CookieService } from "ngx-cookie-service"
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private appService : AppService , private Cookies : CookieService , private route : Router) { 
  }
  ngOnInit(): void {
    this.checkConnected()
  }
  username=new FormControl('')
  pwd=new FormControl('')
  isLoading=false
  invalidData=false
  disableBtn=false
  checkConnected(){/*check if user already connected*/
    if(this.Cookies.check("clid"))
    {
      this.route.navigate(["/"])
    }
  }
  async handleSubmit(e: any ){
    e.preventDefault()
    this.invalidData=false
    this.isLoading=true
    var path=`/login.php?un=${encodeURIComponent(this.username.value)}&pwd=${encodeURIComponent(this.pwd.value)}`
    await this.appService.getData(path).then((res)=>{
      this.isLoading=false
      if(res.data!=null)
      {
        this.disableBtn=true
        var maxAge = new Date();
        var time = maxAge.getTime();
        time += 24*60*60*1000*5;/* 5 days cookie maxAge */
        maxAge.setTime(time);
        this.Cookies.set("clid",res.data.idProfile,{expires:maxAge})
        window.location.pathname="/"
      }
      else 
      {
        this.invalidData=true
      }
    }).catch(()=>{
      /* waiting for notification component */
    })
  }
   handleFocusInput(e : any){
        if(e.target.value=="")
        {
          const label=e.target.parentNode.childNodes[0]
          label.style.left="" 
          label.style.transform="translateY(0)"
          label.style.fontSize="12px"
          e.target.style.borderColor="#2563eb"
          label.style.color="#2563eb"
        }
    }
    handleBlurInput(e : any){
        const label=e.target.parentNode.childNodes[0]
        if(e.target.value=="")
        {
          label.style.left="" 
          label.style.transform="translateY(16px)"
          label.style.fontSize=""
          e.target.style.borderColor=""
          label.style.color=""
        }
    }
}
