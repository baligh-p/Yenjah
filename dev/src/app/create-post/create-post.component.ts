import { Component, OnInit , Input, OnChanges ,  SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../app.service';
import {CookieService} from "ngx-cookie-service"
import {Router} from "@angular/router"

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'] , 
})
export class CreatePostComponent implements OnInit , OnChanges{

  constructor(private DomSanitizer : DomSanitizer, private appService : AppService , private cookie : CookieService , private route  : Router) {
    this.route.events.subscribe(val => {
      window.location.pathname.indexOf("create-Post")!==-1 ? this.type="create" : this.type="modify"
    })
   }
   /*this component used for create and modify post(MyPostComponent) that's why we use type variable to hide some function*/
  ngOnInit(): void {
    this.checkConnected()
    this.checkPath()
    if(this.type==="create")
    {
      this.getGeneralTypes()
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.currentData && this.type=="modify")
    {
      this.image=""
      this.title=this.currentData.titre 
      this.description=this.currentData.text  
      this.objectif=this.currentData.objectif
      this.nbrDesc=this.currentData.text.length 
      this.nbrTitle=this.currentData.titre.length
    }
  }
  type  : any
  checkPath(){
    if(window.location.pathname.indexOf("/create-Post")!=-1) this.type="create"
    else this.type="modify"
  }
  checkConnected(){/*check if user already connected*/
    if(!this.cookie.check("clid"))
    {
      this.route.navigate(["/"])
    }
  }
  @Input() currentData :any
  local = true
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
  objectif ="help"
  submit=true
  handleSubmit(){
    this.handleChangeValueTitle()
    if(this.submit)
    {
      this.isLoading=true
      var data = new FormData()
      data.append("title",UseTrueString(this.title))
      data.append("description",UseTrueString(this.description))
      data.append("objective",this.objectif)
      if(this.type=="create")
      {
        data.append("idProfile",this.cookie.get("clid"))
        data.append("generalType",this.generalType) 
        data.append("specificType",this.specificType)
      }
      else 
      {
        data.append("idPost",this.currentData.idPost)
      }
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
        this.appService.sendData("/modifyPost.php",data).then((res)=>{
         window.location.reload()
          this.isLoading=false
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
    if(e.target.value=="" && this.type==="create")
    {
      const label=e.target.parentNode.childNodes[0]
      label.style.transform="translateY(0)"
      label.style.fontSize="12px"
      e.target.style.borderColor="#f87171"
      label.style.color="#f87171"
    }
  }
  handleBlurInput(e : any){
      if(e.target.value=="" && this.type==="create")
      { 
        const label=e.target.parentNode.childNodes[0]
        label.style.transform="translateY(16px)"
        label.style.fontSize=""
        e.target.style.borderColor=""
        label.style.color=""
      }
  }


  validTitle=""
  handleChangeValueTitle(){
    this.nbrTitle=this.title.length
    if(this.nbrTitle>20)
    {
      this.submit=false
      this.validTitle="very long title"
    }
    else if(this.nbrTitle<3)
    {
      this.submit=false 
      this.validTitle="title should contains at least 3 characteres"
    }
    else 
    {
      this.submit=true
      this.validTitle=""
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