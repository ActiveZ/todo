import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { TodoComponent } from './components/todo/todo.component';
import { FormTodoComponent } from './components/form-todo/form-todo.component';

import { FilterCategoriePipe } from './pipes/filter-categorie.pipe';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HeaderComponent,
    TodoComponent,
    FormTodoComponent,
    FilterCategoriePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
