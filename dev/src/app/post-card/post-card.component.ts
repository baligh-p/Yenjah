import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-post-cards',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  @Input() usersData : any
  @Input() loading : any
}
