import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName , NgModel } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../app.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router"
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( private DomSanitizer : DomSanitizer  , private appService : AppService , private cookies : CookieService , private route : Router ) { }

  ngOnInit(): void {
    this.checkConnected()
  }
  
  /*attributs */ 

  showRemovePhoto=false
  photoExist=false
  typeNotSupported=false
  usedUsername = false 
  loading= false
  disableBtn=false

  errors : any=[]
  styles={
    height:"", 
    width:"", 
  }
  /*methods*/
  checkConnected(){/*check if user already connected*/
    if(this.cookies.check("clid"))
    {
      this.route.navigate(["/"])
    }
  }
  controlData(){
    var LetSubmit = true
    if(!UseTrueEmail(this.email))
    {
      this.errors.push("Invalide Email")
      LetSubmit=false
    } 
    if(this.usedUsername)
    {
      LetSubmit=false 
      this.errors.push("username already used")
    }
    if(!UseTrueOneWord(this.username))
    {
      this.errors.push("Username should contains one word")
      LetSubmit=false
    }
    if (UseTrueLength(this.username)<3)
    {
      LetSubmit=false
      this.errors.push("Username should contains at least 3 caracteres");
    }
    if(this.pwd.length<3)
    {
      LetSubmit=false
      this.errors.push("Password should contains at least 3 caracteres");
    }
    if(this.pwd!=this.confirmePwd)
    {
      LetSubmit=false
      this.errors.push("Please confirme your right password");
    }
    return LetSubmit
  }
  verifyUsernameLoading=false
  async checkUniqueUsername(){
    if(UseTrueLength(this.username)>2)
    {
      this.verifyUsernameLoading=true
      await this.appService.getData(`/signUp.php?user=${UseTrueString(encodeURIComponent(this.username))}`).then((res)=>{
      this.verifyUsernameLoading=false
      if(res.data.nbrUser>0)
      {
        this.usedUsername=true
      }
      else 
      {
        this.usedUsername=false
      }
      })
    }
  }
  handleSubmit(){
    this.errors=[]
    const submit = this.controlData()
    if(submit)
    {
      this.disableBtn=true
      this.loading=true
      var data = new FormData()
      data.append("username",UseTrueString(this.username))
      data.append("password",this.pwd) 
      if (this.image!=undefined)
      {
        if(this.image.value!="") data.append("photo",this.image)
      }
      data.append("email",this.email)
      this.appService.sendData("/signUp.php",data).then((res)=>{
        if(res.data.nbrUser!=0)
        {
          this.disableBtn=false
          this.loading=false
          this.errors.push("Email already used")
        }
        else 
        {
          var maxAge = new Date();
          var time = maxAge.getTime();
          time += 24*60*60*1000*5;/* 5 days cookie maxAge */
          maxAge.setTime(time);
          this.cookies.set("clid",res.data.id,{expires:maxAge})
          window.location.pathname="/"
        }
      })
    }
  }
  

  username : any =""
  pwd  : any =""
  confirmePwd : any=""
  email  : any =""
  placeHolderImage : any ="/assets/icons/addPhoto.png"
  image  : any
  removePhoto(){
    this.image=""
    this.styles.height=""
    this.styles.width=""
    this.placeHolderImage="/assets/icons/addPhoto.png"
    this.photoExist=false
  }
  handlePhotoChange(e : any){
    if(e.target.value!="")
    {
        const file : File= e.target.files[0] 
        if(e.target.files[0].type.indexOf("image")!=-1)
        {
          this.placeHolderImage=this.DomSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files[0]))
          this.styles.width="100%"
          this.styles.height="100%"
          this.photoExist=true 
          this.typeNotSupported=false
          this.image=file
        }
        else 
        {
          this.removePhoto()
          this.typeNotSupported=true
        }
    }
    else 
    {
        this.placeHolderImage="/assets/icons/addPhoto.png"
        this.styles.height=""
        this.styles.width=""
        this.photoExist=false
    }
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

 /*controle de saisir */
const UseTrueEmail=(email : any)=>{
email = UseTrueString(email)
return  email.indexOf(" ")===-1 && email.indexOf("@")>0 &&
        email.lastIndexOf(".")>email.indexOf("@")+1 &&
        email.lastIndexOf(".")+1<email.length
} 
const UseTrueOneWord=(string : any)=>{
    string=UseTrueString(string)
    return string.indexOf(" ")===-1
}
const UseTrueLength=(string : any)=>{
    var chaine=cleaner(string) 
    return chaine.length
} 
const UseTrueString= (string : any)=>{
    return cleaner(string).join("")
}
const cleaner=(chaine : any)=>{
    var render=Array.from(chaine)
    for(var i=0;i<(render.length)-1;i++)
    {
        if(render[i]==" "&&render[i+1]==" ")
        {
            render.splice(i,1)
            i--
        }
    }
    if(render[0]!==undefined && render[0]==" ")
    {
        render.splice(0,1)
    }
    if(render[render.length-1]!==undefined && render[render.length-1]==" ")
    {
        render.splice(render.length-1,1)
    }
    return render
}