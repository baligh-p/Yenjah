import { Component, OnInit ,Input} from '@angular/core';
import { AppService } from '../app.service';
import {CustomizingDate} from "../home/customizingDates"
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private appService :AppService) { }

  ngOnInit(): void {
    this.getComments()
  }
  @Input() id : any
  magicDates=new CustomizingDate()
  changeDate(date : string){
    return this.magicDates.UseDate(date)
  }
  getComments(){
    this.appService.getData(`/commentaire.php?idPost=${this.id}`).then((res)=>{
      this.comments=res.data
    })
  }
  comments : any
}
