import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.getCategories()
  }
  categories  = {}
  keys = Object.keys(this.categories)
  getCategories(){
    this.appService.getData("/types.php?allTypes=all").then((res)=>{
      this.categories=res.data
    })
  }
}
