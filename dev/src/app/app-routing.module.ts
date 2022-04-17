import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavComponent} from "./nav/nav.component"
import {LoginComponent} from "./login/login.component"
import {SignUpComponent} from "./sign-up/sign-up.component"
import { CreatePostComponent } from './create-post/create-post.component';
import {HomeComponent} from "./home/home.component"
import { MyPostComponent } from './my-post/my-post.component';
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
<<<<<<< HEAD
    },
    {
      path:"my-post",
      component:MyPostComponent
    },
=======
    }, 
    {
      path:"my_Post" , 
      component:MyPostComponent
    }
>>>>>>> origin/master
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
