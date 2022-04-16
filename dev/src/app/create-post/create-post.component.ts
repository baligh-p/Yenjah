import { Component, OnInit , Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../app.service';
import {CookieService} from "ngx-cookie-service"
import {Router} from "@angular/router"
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private DomSanitizer : DomSanitizer, private appService : AppService , private cookie : CookieService , private route  : Router) {
   }

  ngOnInit(): void {
    this.getGeneralTypes()
    this.checkConnected()
    this.checkPath()
    this.fillForm()
    this.titleInput=document.getElementById("title")
  }
  titleInput : any
  type  : any
  checkPath(){
    if(window.location.pathname.indexOf("/create-Post")!=-1) this.type="create"
    else this.type="modify"
  }
  fillForm(){
    if(this.type=="modify")
    {
      this.title="sdf"
      
    }
  }
  checkConnected(){/*check if user already connected*/
    if(!this.cookie.check("clid"))
    {
      this.route.navigate(["/"])
    }
  }
  description=""
  title=""
  nbrTitle=0
  nbrDesc=0
  showSelect=false 
  generalTypeListe  : any =[]
  specifiqueTypeListe=[]
  generalType ="other"
  specificType="other"
  isLoading=false
  objectif = "help"
  submit=true
  handleExceptions(){

  }
  handleSubmit(){
    if(this.submit)
    {
      this.isLoading=true
      var data = new FormData()
      data.append("title",UseTrueString(this.title))
      data.append("description",UseTrueString(this.description))
      data.append("generalType",this.generalType) 
      data.append("specificType",this.specificType)
      data.append("objective",this.objectif)
      data.append("idProfile",this.cookie.get("clid"))
      if (this.image!=undefined)
      {
        if(this.image.value!="") data.append("photo",this.image)
      }
      if(this.type=="create")
      {
        this.appService.sendData("/createPost.php",data).then(()=>{
          this.route.navigate(["/"])
        }).catch(()=>{
          this.isLoading=false
        })
      }
      else if(this.type=="modify")
      {
        this.appService.sendData("/modifyPost.php",data).then(()=>{
          //something here :: 
        }).catch(()=>{
          this.isLoading=false
        })
      }
    }
  }
  getGeneralTypes(){
    this.appService.getData("/types.php").then((res)=>{
      this.generalTypeListe=res.data
    })
  }
  getSpecifiqueTypes(){
    var id=this.generalTypeListe.filter((element : any)=> element.type===this.generalType)
    this.appService.getData(`/types.php?specType=${encodeURIComponent(id[0].idTypeGeneral)}`).then((res)=>{
      this.specifiqueTypeListe=res.data
    })
  }
  handleChangeSelect()
  {
    if(this.generalType!="other")
    {
      this.showSelect=true
      this.getSpecifiqueTypes()
    } 
    else this.showSelect=false
  }
  placeHolderImage : any ="/assets/icons/addPhoto.png"
  photoExist=false
  typeNotSupported=false
  image  : any
  styles={
    height:"", 
    width:"", 
  }
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
      label.style.transform="translateY(0)"
      label.style.fontSize="12px"
      e.target.style.borderColor="#f87171"
      label.style.color="#f87171"
    }
  }
  handleBlurInput(e : any){
      const label=e.target.parentNode.childNodes[0]
      if(e.target.value=="")
      { 
        label.style.transform="translateY(16px)"
        label.style.fontSize=""
        e.target.style.borderColor=""
        label.style.color=""
      }
  }


  validTitle=true
  handleChangeValueTitle(){
    this.nbrTitle=this.title.length
    if(this.nbrTitle>20)
    {
      this.submit=false
      this.validTitle=false
    }
    else 
    {
      this.submit=true
      this.validTitle=true
    }
  }
  validTitleDescription=true
  handleChangeValueDescription(){
    this.nbrDesc=this.description.length
    if(this.nbrDesc>300)
    {
      this.submit=false
      this.validTitleDescription=false
    }
    else 
    {
      this.submit=true
      this.validTitleDescription=true
    }
  }
}

/* --input control-- */
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