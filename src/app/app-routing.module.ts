import { NgModule } from '@angular/core';
import { UserComponent } from './components/user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';


const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserComponent },
  { path: 'todos/:id/:nom/:email', component: TodoComponent },
  { path: '**', redirectTo: 'users' } //evite les pages not found tout les chemins vont à users.
];

@NgModule({
  declarations: [],
  exports: [RouterModule],
  imports: 
  [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
