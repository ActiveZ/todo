import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private Url = 'http://localhost:3000';
  listTodoByUser$ = new Subject<Todo[]>(); // flux de la liste des Todos A faire d'un utilisateur
  listTodoByUserDone$ = new Subject<Todo[]>(); // flux de la liste des Todos Faits d'un utilisateur
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.Url + '/todos'); // base de données
  }

  getTodosByUserId(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.Url + '/users/' + id + '?_embed=todos');
  }

  //supprimer une tâche
  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(this.Url + '/todos/' + id);
  }

  //valider une tâches
  checkTodo(id: number) : Observable<any>{
    return this.http.patch<Todo[]>(this.Url + '/todos/' + id, {"done":true});
  }

  //Creation d'une nouvelle tâche
  newTodo(newTodo:Todo):Observable<any>{
    return this.http.post<Todo>(this.Url+'/todos', newTodo);
  }

  //rafraichir les listes de tâches de l'utilisateur A faire et Faite
  refreshListTodoByUserId(id: number) {
    const todoDone: Todo[] = [];
    const todo: Todo[] = [];
    this.getTodosByUserId(id).subscribe((data: any) => {
      data['todos'].forEach((elementTodo: any) => {
        if (!elementTodo.done) {
          todo.push(elementTodo);
        } else {
          todoDone.push(elementTodo);
        }
      });
      this.listTodoByUser$.next(todo);
      this.listTodoByUserDone$.next(todoDone);

      console.log('Data refresh list Todo By User : ' + JSON.stringify(data));
    });
  }

  
}
