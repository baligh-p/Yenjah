import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavComponent} from "./nav/nav.component"
import {LoginComponent} from "./login/login.component"
const routes: Routes = [{
  path:"", 
  component:NavComponent
},
{
  path:"login" , 
  component:LoginComponent,
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
