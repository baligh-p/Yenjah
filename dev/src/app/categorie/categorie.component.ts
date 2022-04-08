import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
  categories  = {
    informatique   : ["souris" , "clavier" , "casque" , "micro" ] , 
    automobile   : ["labalba" ,  "lablab" , "moto" , "voiture" ] , 
    immobilier   : ["labalba" ,  "lablab" , "moto" , "voiture" ]
  }
 firstCategorie = Object.keys(this.categories)
}
