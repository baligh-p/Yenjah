import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
    
  }
  handleSubmit(){

  }
  photoExist=false
  typeNotSupported=false
  erros=[]

  image : any;
  username=new FormControl("")
  pwd=new FormControl("")
  confirmePwd=new FormControl("")

  handlePhotoChange(){
    
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
