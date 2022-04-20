import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

import { UserComponent } from './components/user/user.component';
import { TodoComponent } from './components/todo/todo.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
   
    AppComponent,
    UserComponent,
    HeaderComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
