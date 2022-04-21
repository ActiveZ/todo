import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { FormTodoComponent } from './components/form-todo/form-todo.component';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserComponent },
  { path: 'todos/:id/:nom/:email', component: TodoComponent },
  { path: 'newTodo/:id/:nom/:email', component: FormTodoComponent },//id de l'utilisateur
  { path: '**', redirectTo: 'users' } //evite les pages not found tout les chemins vont à users.
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: 
  [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
