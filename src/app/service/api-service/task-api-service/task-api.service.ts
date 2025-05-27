import {inject, Injectable} from '@angular/core';
import {Task} from "../../../model/Task";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class TaskApiService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL: string = 'http://localhost:8080/api/lists';

  getTasksByList(listId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.BASE_URL}/${listId}/tasks`);
  }

  getAllUserTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.BASE_URL}/all-tasks`);
  }

  getTodayTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:8080/api/lists/tasks/today');
  }

  getUpcomingTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:8080/api/lists/tasks/upcoming');
  }

  createTask(listId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.BASE_URL}/${listId}/tasks`, task);
  }

  updateTask(taskId: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.BASE_URL}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/tasks/${taskId}`);
  }
}
