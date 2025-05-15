import {inject, Injectable} from '@angular/core';
import {TaskApiService} from "./api-service/task-api-service/task-api.service";
import {TaskListApiService} from "./api-service/task-list-api-service/task-list-api.service";
import {CategoryApiService} from "./api-service/category-api-service/category-api.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Category} from "../model/Category";
import {TaskList} from "../model/TaskList";
import {Task} from "../model/Task";

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  // Services
  private taskApiService: TaskApiService = inject(TaskApiService);
  private taskListApiService: TaskListApiService = inject(TaskListApiService);
  private categoryApiService: CategoryApiService = inject(CategoryApiService);

  // State variables
  private categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public categories$: Observable<Category[]> = this.categories.asObservable();
  public taskLists$: Observable<TaskList[]> = this.categories$.pipe(
    map((categories: Category[]) => {
      const allTaskLists: TaskList[] = [];
      for (const category of categories) {
        allTaskLists.push(...category.lists);
      }
      return allTaskLists;
    })
  );
  constructor() {
    const categories: Category[] = this.categoryApiService.getCategoriesByUser(1);
    this.categories.next(categories);
  }

  addCategory(category: Category): void {
    const currentCategories: Category[] = this.categories.getValue();
    this.categories.next([...currentCategories, category]);
    this.categoryApiService.createCategory(1, category);
  }

  addTaskList(taskList: TaskList, category: Category) {
    const currentCategories: Category[] = this.categories.getValue();
    const index: number = currentCategories.findIndex((cat) => cat.title === category.title);
    if (index !== -1) {
      currentCategories[index].lists.push(taskList);
      this.categories.next([...currentCategories]);
      this.taskListApiService.createTaskList(1, category, taskList);
    }
  }

  addTask(task: Task, taskList: TaskList): void {
    const currentCategories = this.categories.getValue();
    let updated = false;

    for (const category of currentCategories) {
      const list = category.lists.find((l) => l.title === taskList.title);
      if (list) {
        list.tasks.push(task);
        updated = true;
        break;
      }
    }

    if (updated) {
      this.categories.next([...currentCategories]);
      //this.taskApiService.createTask(1, taskList, task);
    }
  }


}
