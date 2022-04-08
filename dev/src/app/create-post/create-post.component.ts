import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppService } from '../app.service';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private DomSanitizer : DomSanitizer, private appService : AppService) { }

  ngOnInit(): void {
  }
  description=""
  title=""
  nbrTitle=0
  nbrDesc=0
  showSelect=false 
  generalTypeListe=["other","info" , "automobile" , "immobilier" , "telephone" ] 
  specifiqueTypeListe=[ "other","souris" , "clavier" , "casque"]
  generalType="other"
  specificType="other"
  isLoading=false
  objectif = "help"
  errors=[]

  async handleSubmit(){
    this.isLoading=true
    var data = new FormData()
    data.append("title",UseTrueString(this.title))
    data.append("description",UseTrueString(this.description))
    data.append("generalType",this.generalType) 
    data.append("specificType",this.specificType)
    data.append("objective",this.objectif)
    if (this.image!=undefined)
    {
      if(this.image.value!="") data.append("photo",this.image)
    }
    
    await this.appService.sendData("/createPost.php",data).then(()=>{

    }).catch(()=>{
      this.isLoading=false
    })
  }
  getSpecifiqueTypes(){
    /*fetched from restful api*/ 
  }
  handleChangeSelect()
  {
    if(this.generalType!="other")this.showSelect=true 
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
  removePhoto(file : any){
    file.target.value=""
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
  handleChangeValueTitle(){
    this.nbrTitle=this.title.length
  }
  handleChangeValueDescription(){
    this.nbrDesc=this.description.length
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