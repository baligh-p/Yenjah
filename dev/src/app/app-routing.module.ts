import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavComponent} from "./nav/nav.component"
import {LoginComponent} from "./login/login.component"
import {SignUpComponent} from "./sign-up/sign-up.component"
import { CreatePostComponent } from './create-post/create-post.component';
import {HomeComponent} from "./home/home.component"
const routes: Routes = [{
  path:"", 
  component:NavComponent, 
  children:[ 
    {
      path:"create-Post" , 
      component:CreatePostComponent
    }, 
    {
      path:"" ,  
      component:HomeComponent
    }
  ]
},
{
  path:"login" , 
  component:LoginComponent,
},
{
  path:"sign_up" , 
  component:SignUpComponent,
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
