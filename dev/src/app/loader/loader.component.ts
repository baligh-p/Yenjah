import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css',"./loading.scss"]
})
export class LoaderComponent implements OnInit {
  @Input() size : any ; 
  @Input()  border : any ; 
  @Input() height : any ; 
  @Input() className : any ; 
  @Input() show : any ;
  styles={
  }
  constructor() { }

  ngOnInit(): void {
    this.styles={
      height:this.size , 
      width:this.size , 
      borderWidth:this.border
    }
  }

}
