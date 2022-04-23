import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../local-storage-service.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor( private locStorage : LocalStorageService) { }

  ngOnInit(): void {
  }
  handleSearch(e : any){
    this.locStorage.setItem("search",e.target.value)
  }
}
