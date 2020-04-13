import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {TodoService } from '../services/todo.service';
import { TodoModel } from '../models/todo.model';

@Injectable({ providedIn: 'root' })
export class TodoRepository {
  #todoList$: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>([]);
  get todoList$() {
    return this.#todoList$;
  }

  constructor(private todoService: TodoService) {
    this.getCompleteTodoList();
  }

  getCompleteTodoList(): void {
    this.todoService.getCompleteTodoList().subscribe(res => {
      if (res.message === 'ok') {
        this.#todoList$.next(res.todoList);
      }
    });
  }

  createTodo(todo: TodoModel): void {
    this.todoService.createTodo(todo).subscribe(res => {
      if (res.message === 'ok') {
        const list: TodoModel[] = this.#todoList$.getValue();
        list.push(todo);
        this.#todoList$.next(list);
      }
    });
  }

  updateTodo(todo: TodoModel): void {
    this.todoService.updateTodo(todo).subscribe(res => {
      if (res.message === 'ok') {
        const list: TodoModel[] = this.#todoList$.getValue();
        list.map((task) => {
          if (task.id === todo.id) { task = todo; }
          return;
        });
        this.#todoList$.next(list);
      }
    });
  }

  deleteTodo(todoId: string): void {
    this.todoService.deleteTodo(todoId).subscribe(res => {
      if (res.message === 'ok') {
        const list: TodoModel[] = this.#todoList$.getValue();
        const newList = list.filter((task) => {
          return task.id !== todoId;
        });
        console.log(newList);
        this.#todoList$.next(newList);
      }
    });
  }
}
