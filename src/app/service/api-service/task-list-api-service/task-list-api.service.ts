import {inject, Injectable} from '@angular/core';
import {TaskList} from "../../../model/TaskList";
import {Category} from "../../../model/Category";
import {TaskManagerService} from "../../task-manager.service";

@Injectable({
  providedIn: 'root'
})
export class TaskListApiService {
  // Constants
  private baseUrl: string = 'http://localhost:8080/api';
  constructor() {}

  getTaskListsByCategory(userId: number, categoryId: number): void {

  }

  getAllTaskLists(userId: number, categories: Category[]): TaskList[] {
    const allTaskLists: TaskList[] = [];
    for (const category of categories) {
      allTaskLists.push(...category.lists);
    }
    return allTaskLists;
  }

  createTaskList(userId: number, categoryId: Category, taskList: TaskList): void {

  }

  deleteTaskList(userId: number, categoryId: number, taskListId: number): void {

  }

  updateTaskList(userId: number, categoryId: number, taskListId: number, taskList: TaskList): void {

  }

}
