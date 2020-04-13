import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo.model';

import { todoList } from './testTodoList';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  delayInMilliseconds = 2000;
  success = { message: 'ok' };

  constructor() { }

  createTodo(todo: TodoModel): Observable<any> {
    let params = todo as any;
    params = JSON.stringify(params);
    this.sleep();
    return of(this.success);
  }

  readTodo(todoId: string): Observable<any> {
    const todo: TodoModel = {
      id: '196yc6z9g44',
      name: 'Cita en el quirofano'
    };
    this.sleep();
    return of({ message: 'ok', todo });
  }

  updateTodo(todo: TodoModel): Observable<any> {
    let params = todo as any;
    params = JSON.stringify(params);
    this.sleep();
    return of(this.success);
  }

  deleteTodo(todoId: string): Observable<any> {
    this.sleep();
    return of(this.success);
  }

  getCompleteTodoList(): Observable<any> {
    this.sleep();
    return of({ message: 'ok', todoList });
  }


  sleep() {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < this.delayInMilliseconds);
  }
}
