import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { User } from 'src/app/models/user';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  user: User = {
    id: 0,
    nom: '',
    email: '',
  };
  
  filterargs = {categorie: ''};

  listTodoByUserId$?:Observable<Todo[]>
  listTodoByUserIdDone$?:Observable<Todo[]>

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.nom = String(this.route.snapshot.paramMap.get('nom'));
    this.user.email = String(this.route.snapshot.paramMap.get('email'));
    
    //pipe Async
    this.listTodoByUserId$ = this.todoService.listTodoByUser$.asObservable() // l'abonnement
    this.listTodoByUserIdDone$ = this.todoService.listTodoByUserDone$.asObservable() // l'abonnement
    this.todoService.refreshListTodoByUserId(this.user.id) // récupération des informations de Todo de l'utilisateur
  }

  //suprrimer une tâches
  onDelete(id:number){
    console.log(id);
    this.todoService.deleteTodo(id)
    .subscribe(data =>{
     console.log(data);
    this.todoService.refreshListTodoByUserId(this.user.id)
    })
  }

  //valider une tâche
  onCheck(id:number){
    this.todoService.checkTodo(id)
    .subscribe(data => {
      console.log("On check :",data);
      this.todoService.refreshListTodoByUserId(this.user.id)
    })
  }

}
