import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName , NgModel } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( private DomSanitizer : DomSanitizer ) { }

  ngOnInit(): void {
  }
  
  /*attributs */ 

  showRemovePhoto=false
  photoExist=false
  typeNotSupported=false
  usedUsername = false
  errors : any=[]
  styles={
    height:"", 
    width:"", 
  }
  /*methods*/

  controlData(){
    var LetSubmit = true
    if(!this.UseTrueEmail(this.email))
    {
      this.errors.push("Invalide Email")
      LetSubmit=false
    } 
    if(!this.UseTrueOneWord(this.username))
    {
      this.errors.push("Username should contains one word")
      LetSubmit=false
    }
    if (this.UseTrueLength(this.username)<3)
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

  handleSubmit(){
    const submit = this.controlData()
    if(submit)
    {
      var data = new FormData() 
    }
  }
  

  username : any 
  pwd  : any
  confirmePwd : any
  email  : any 
  placeHolderImage : any ="/assets/icons/addPhoto.png"
  removePhoto(file : any){
    file.target.value=""
    this.styles.height=""
    this.styles.width=""
    this.placeHolderImage="/assets/icons/addPhoto.png"
    this.photoExist=false
  }
  handlePhotoChange(e : any){
    const file : File= e.target.files[0] 
    if(e.target.value!="")
    {
        if(e.target.files[0].type.indexOf("image")!=-1)
        {
          this.placeHolderImage=this.DomSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(e.target.files[0]))
          this.styles.width="100%"
          this.styles.height="100%"
          this.photoExist=true 
          this.typeNotSupported=false
        }
        else 
        {
          this.removePhoto(e)
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
  UseTrueLength(string : any){
      var chaine=this.cleaner(string) 
      return chaine.length
  } 
  UseTrueString(string : any){
      return this.cleaner(string).join("")
  }
  cleaner(chaine : any){
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
  UseTrueEmail(email : any){
  email = this.UseTrueString(email)
  return  email.indexOf(" ")===-1 && email.indexOf("@")>0 &&
          email.lastIndexOf(".")>email.indexOf("@")+1 &&
          email.lastIndexOf(".")+1<email.length
  } 
  UseTrueOneWord=(string : any)=>{
      string=this.UseTrueString(string)
      return string.indexOf(" ")===-1
  }
}