import { Injectable } from '@angular/core';
import {Task} from "../../../model/Task";

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private baseUrl: string = 'http://localhost:8080/api';
  constructor() { }

  getTasksByTaskList(userId: number, categoryId: number, taskListId: number): void {

  }

  createTask(userId: number, categoryId: number, taskListId: number, task: Task): void {

  }

  deleteTask(userId: number, categoryId: number, taskListId: number, taskId: number): void {

  }

  updateTask(userId: number, categoryId: number, taskListId: number, taskId: number, task: Task): void {

  }

}
