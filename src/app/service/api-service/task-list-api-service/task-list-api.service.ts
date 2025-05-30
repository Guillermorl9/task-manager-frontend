import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskList } from '../../../model/TaskList';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskListApiService {
  private http: HttpClient = inject(HttpClient);
  private readonly BASE_URL: string = 'http://localhost:8080/api/categories';

  getTaskListsByCategory(categoryId: number): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${this.BASE_URL}/${categoryId}/lists`);
  }

  getAllTaskLists(): Observable<TaskList[]> {
    return this.http.get<TaskList[]>(`${this.BASE_URL}/user/lists`);
  }

  createTaskList(categoryId: number, taskList: TaskList): Observable<TaskList> {
    return this.http.post<TaskList>(`${this.BASE_URL}/${categoryId}/lists`, taskList);
  }

  updateTaskList(taskListId: number, taskList: TaskList): Observable<TaskList> {
    return this.http.put<TaskList>(`${this.BASE_URL}/lists/${taskListId}`, taskList);
  }

  deleteTaskList(taskListId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/lists/${taskListId}`);
  }
}
