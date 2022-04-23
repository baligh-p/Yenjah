import { Component, OnInit, VERSION, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../app.service';
import { LocalStorageService } from '../local-storage-service.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  
  constructor(private appService:AppService , private locStorage : LocalStorageService) { }

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
