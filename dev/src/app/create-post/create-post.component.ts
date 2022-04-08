import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  constructor(private DomSanitizer : DomSanitizer) { }

  ngOnInit(): void {
  }
  description=""
  title=""
  nbrTitle=0
  nbrDesc=0 
  generalType=["info" , "automobile" , "immobilier" , "telephone"] 
  specifiqueType=["souris" , "clavier" , "casque"]
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
