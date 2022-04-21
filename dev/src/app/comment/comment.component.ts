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
  }
  @Input() id : any
  magicDates=new CustomizingDate()
  changeDate(date : string){
    return this.magicDates.UseDate(date)
  }
  getComments(){
    this.appService.getData("")
  }
  comments=[
    {
      "text":"loremloremloremloremloremloremloremloremloremloremloremloremloremlorem" , 
      "username":"raed", 
      "dateCreate":"2020-20-20 20:20:20" , 
      "photo":"/photoProfile/xv91707v84A24j2r251W.jpg"
    }
  ]
}
