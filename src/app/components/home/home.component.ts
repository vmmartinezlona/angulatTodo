import { Component, OnInit } from '@angular/core';
import { TodoBloc } from '../../blocs/todo.bloc';
import { TodoRepository } from 'src/app/repositories/todo.respository';
import { Todo } from 'src/app/models/todo.model';
import { DomSanitizer } from '@angular/platform-browser';
import { $ } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public todoList: Todo[];
  public newTodoName = '';
  private editTodoId: string;
  private todoBloc: TodoBloc;

  constructor(private todoRepository: TodoRepository) {
    this.todoBloc = new TodoBloc(this.todoRepository);
  }

  ngOnInit(): void {
    this.getTodoList();
  }

  editTodoTask(e, todoId) {
    const todoInput = e.target;
    todoInput.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        this.updateTodo(todoId, todoInput.value);
      }
    });
  }

  ngOnDestroy() {
    this.todoBloc.dispose();
  }

  addTodo() {
    this.todoBloc.createTodo(this.newTodoName);
  }

  updateTodo(todoId: string, todoName: string) {
    this.todoBloc.updateTodo(todoId, todoName);
    setTimeout(() => {
      this.getTodoList();
    }, 3000);
  }

  deleteTodo(todoId) {
    this.todoBloc.deleteTodo(todoId);
    setTimeout(() => {
      this.getTodoList();
    }, 3000);
  }

  getTodoList() {
    this.todoList = this.todoBloc.todoList$;
  }
}
