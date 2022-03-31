import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }
   handleFocusInput(e : any){
        if(e.target.value=="")
        {
            const label=e.target.parentNode.childNodes[0]
            label.style.left="" 
            label.style.transform="translateY(0)"
            label.style.fontSize="12px"
            e.target.style.borderColor="#2563eb"
            label.style.color="#2563eb"
        }
    }
    handleBlurInput(e : any){
        const label=e.target.parentNode.childNodes[0]
        if(e.target.value=="")
        {
            label.style.left="" 
            label.style.transform="translateY(16px)"
            label.style.fontSize=""
            e.target.style.borderColor=""
            label.style.color=""
        }
    }
}
