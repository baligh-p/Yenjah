import { Component, OnInit , Input } from '@angular/core';
import { CustomizingDate } from '../home/customizingDates';
@Component({
  selector: 'app-post-cards',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  magicDates=new CustomizingDate()
  changeDate(date : string){
    return this.magicDates.UseDate(date)
  }
  @Input() usersData : any
  @Input() loading : any
}
