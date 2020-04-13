// import { Observable } from 'rxjs';
import { BehaviorSubject, Observable, Observer, from as observableFrom } from 'rxjs';
import { TodoRepository } from '../repositories/todo.respository';
import { TodoModel } from '../models/todo.model';

export class TodoBloc {
  #todoList$: BehaviorSubject<TodoModel[]> = new BehaviorSubject<TodoModel[]>([]);
  get todoList$(): Observable<TodoModel[]> {
    return this.#todoList$;
  }

  constructor(private todoRepository: TodoRepository) {
    this.#todoList$ = this.todoRepository.todoList$;
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

  dispose() {
    this.#todoList$.complete();
  }
}
