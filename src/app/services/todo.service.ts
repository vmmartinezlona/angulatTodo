import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';

import { todoList } from './testTodoList';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  delayInMilliseconds = 2000;

  constructor() { }

  createTodo(todo: Todo, getMessage: (message: string) => void) {
    let params = todo as any;
    params = JSON.stringify(params);
    setTimeout(() => {
      getMessage('ok');
    }, this.delayInMilliseconds);
  }

  readTodo(todoId: string, getTodo: (todo: Todo) => void) {
    const testTodo: Todo = {
      id: '196yc6z9g44',
      name: 'Cita en el quirofano'
    };
    setTimeout(() => {
      getTodo(testTodo);
    }, this.delayInMilliseconds);
  }

  updateTodo(todo: Todo, getMessage: (message: string) => void) {
    let params = todo as any;
    params = JSON.stringify(params);
    setTimeout(() => {
      getMessage('ok');
    }, this.delayInMilliseconds);
  }

  deleteTodo(todoId: string, getMessage: (message: string) => void) {
    setTimeout(() => {
      getMessage('ok');
    }, this.delayInMilliseconds);
  }

  getCompleteTodoList(getTodoList: (response: any) => void) {
    getTodoList({ message: 'ok', todoList });
  }
}
