import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private Url = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.Url + '/todos'); // base de données
  }

  getTodosByUserId(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.Url + '/users/' + id + '?_embed=todos');
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(this.Url + '/todos/' + id);
  }
}
