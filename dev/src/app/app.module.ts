import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { AdvertiseComponent } from './advertise/advertise.component';
import { NavDropComponent } from './nav-drop/nav-drop.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import {CookieService} from "ngx-cookie-service";
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { CategorieComponent } from './categorie/categorie.component';
import { PostCardComponent } from './post-card/post-card.component';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LoginComponent,
    AdvertiseComponent,
    NavDropComponent,
    LoaderComponent,
    SignUpComponent,
    CreatePostComponent,
    HomeComponent,
    CategorieComponent,
    PostCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }