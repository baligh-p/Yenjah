import { Component, Input , OnInit, Output , EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-input-image',
  templateUrl: './input-image.component.html',
  styleUrls: ['./input-image.component.css']
})
export class InputImageComponent implements OnInit {

  constructor(private DomSanitizer : DomSanitizer) { }

  ngOnInit(): void {
  }
  @Input() id  = "" 
  @Output() emitteur=new EventEmitter() 
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
}
