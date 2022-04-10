import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  user={
    username:"Rayen" , 
    title:"title title title",
    description : "title title title ",
    photo : "/assets/icons/user.png" , 
    dateCreate : "20-20-2020 14:14:14", 
    postPhoto:"/assets/icons/user.png" , 
    objective:"advice"
  }
}
