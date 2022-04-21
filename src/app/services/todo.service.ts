import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private url = 'http://localhost:3000';

  listTodoByUser$ = new Subject<Todo[]>(); // flux de la liste des Todos A faire d'un utilisateur
  listTodoByUserDone$ = new Subject<Todo[]>(); // flux de la liste des Todos Faits d'un utilisateur

  constructor(private http: HttpClient) {}

  /**
   *
   * @returns la liste des todo
   */
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url + '/todos'); // base de données
  }

  /**
   *
   * @param id de l'utilisateur sélectionné
   * @returns la liste des todos de l'utilisateur sélectionné
   */
  getTodosByUserId(id: number): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url + '/users/' + id + '?_embed=todos');
  }

  /**
   * Supprimer une tâche
   * @param id de la tâche à supprimer
   * @returns reponse server
   */
  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(this.url + '/todos/' + id);
  }

  /**
   * Valider une tâche
   * @param id de la tâche à valider
   * @returns réponse server
   */
  checkTodo(id: number): Observable<any> {
    return this.http.patch<Todo[]>(this.url + '/todos/' + id, { done: true });
  }

  /**
   * Creation d'une nouvelle tâche
   * @param newTodo nouvelle tâche à ajouter à l'utilisateur 
   * @returns réponse server
   */
  newTodo(newTodo: Todo): Observable<any> {
    return this.http.post<Todo>(this.url + '/todos', newTodo);
  }

  /**
   * rafraichir les listes de tâches de l'utilisateur A faire et Faite
   * @param id de l'utilisateur
   */
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
    });
  }
}
