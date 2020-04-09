import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {TodoService } from '../services/todo.service';
import { Todo } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoRepository {
  private _todoList$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  private _todoListValue: Observable<Todo[]> = this._todoList$.asObservable();

  constructor(private todoService: TodoService) {
    this.getCompleteTodoList();
  }

  get todoList$() {
    return this._todoList$;
  }

  getCompleteTodoList(): void {
    this.todoService.getCompleteTodoList((res) => {
      if (res.message === 'ok') {
        this._todoList$.next(res.todoList);
      }
    });
  }

  createTodo(todo: Todo): void {
    this.todoService.createTodo(todo, (res) => {
      if (res === 'ok') {
        const list: Todo[] = this._todoList$.getValue();
        list.push(todo);
        this._todoList$.next(list);
      }
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo, (res) => {
      if (res === 'ok') {
        const list: Todo[] = this._todoList$.getValue();
        list.map((task) => {
          if (task.id === todo.id) { task = todo; }
          return;
        });
        this._todoList$.next(list);
      }
    });
  }

  deleteTodo(todoId: string): void {
    this.todoService.deleteTodo(todoId, (res) => {
      if (res === 'ok') {
        const list: Todo[] = this._todoList$.getValue();
        const newList = list.filter((task) => {
          return task.id !== todoId;
        });
        console.log(newList);
        this._todoList$.next(newList);
      }
    });
  }
}
