// import { Observable } from 'rxjs';
import { BehaviorSubject, Observable, Observer, from as observableFrom } from 'rxjs';
import { TodoRepository } from '../repositories/todo.respository';
import { Todo } from '../models/todo.model';

export class TodoBloc {
  private _todoList$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  get todoList$(): Todo[] {
    return this._todoList$.getValue();
  }

  constructor(private todoRepository: TodoRepository) {
    this.getTodoList();
  }

  createTodo(name: string) {
    const id = Math.random().toString(36).substring(3);
    this.todoRepository.createTodo({ id, name });
  }

  updateTodo(id: string, name: string) {
    this.todoRepository.updateTodo({ id, name });
  }

  deleteTodo(todoId: string) {
    this.todoRepository.deleteTodo(todoId);
  }

  getTodoList() {
    this._todoList$ = this.todoRepository.todoList$;
  }

  dispose() {
    this._todoList$.complete();
  }
}
