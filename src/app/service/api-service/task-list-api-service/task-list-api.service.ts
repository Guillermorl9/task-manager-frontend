import { Injectable } from '@angular/core';
import {TaskList} from "../../../model/TaskList";
import {Category} from "../../../model/Category";

@Injectable({
  providedIn: 'root'
})
export class TaskListApiService {
  private baseUrl: string = 'http://localhost:8080/api';
  constructor() { }

  getTaskListsByCategory(userId: number, categoryId: number): void {

  }

  createTaskList(userId: number, categoryId: Category, taskList: TaskList): void {

  }

  deleteTaskList(userId: number, categoryId: number, taskListId: number): void {

  }

  updateTaskList(userId: number, categoryId: number, taskListId: number, taskList: TaskList): void {

  }

}
