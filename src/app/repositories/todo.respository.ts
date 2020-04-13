import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {TodoService } from '../services/todo.service';
import { TodoModel } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoRepository {
  private _todoList$: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>([]);
  private _todoListValue: Observable<TodoModel[]> = this._todoList$.asObservable();

  constructor(private todoService: TodoService) {
    this.getCompleteTodoList();
  }

  get todoList$() {
    return this._todoList$;
  }

  getCompleteTodoList(): void {
    this.todoService.getCompleteTodoList().subscribe(res => {
      if (res.message === 'ok') {
        this._todoList$.next(res.todoList);
      }
    });
  }

  createTodo(todo: TodoModel): void {
    this.todoService.createTodo(todo).subscribe(res => {
      if (res.message === 'ok') {
        const list: TodoModel[] = this._todoList$.getValue();
        list.push(todo);
        this._todoList$.next(list);
      }
    });
  }

  updateTodo(todo: TodoModel): void {
    this.todoService.updateTodo(todo).subscribe(res => {
      if (res.message === 'ok') {
        const list: TodoModel[] = this._todoList$.getValue();
        list.map((task) => {
          if (task.id === todo.id) { task = todo; }
          return;
        });
        this._todoList$.next(list);
      }
    });
  }

  deleteTodo(todoId: string): void {
    this.todoService.deleteTodo(todoId).subscribe(res => {
      if (res.message === 'ok') {
        const list: TodoModel[] = this._todoList$.getValue();
        const newList = list.filter((task) => {
          return task.id !== todoId;
        });
        console.log(newList);
        this._todoList$.next(newList);
      }
    });
  }
}
