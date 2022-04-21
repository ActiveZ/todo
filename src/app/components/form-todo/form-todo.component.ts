import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { User } from 'src/app/models/user';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-form-todo',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.css'],
})
export class FormTodoComponent implements OnInit {
  user: User = {
    id: 0,
    nom: '',
    email: '',
  };

  newTodo: Todo = {
    id: new Date().valueOf(),
    titre: '',
    categorie: '',
    done: false,
    userId: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router :Router,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    this.user.id = Number(this.route.snapshot.paramMap.get('id'));
    this.user.nom = String(this.route.snapshot.paramMap.get('nom'));
    this.user.email = String(this.route.snapshot.paramMap.get('email'));
    this.newTodo.userId=this.user.id
  }

  submit() {
    this.todoService
      .newTodo(this.newTodo)
      .subscribe((data) =>{
        console.log('data',data)
        this.router.navigate(['/todos/'+this.user.id+'/'+this.user.nom+'/'+this.user.email])
      });
  }
}
