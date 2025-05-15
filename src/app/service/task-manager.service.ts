import {inject, Injectable} from '@angular/core';
import {TaskApiService} from "./api-service/task-api-service/task-api.service";
import {TaskListApiService} from "./api-service/task-list-api-service/task-list-api.service";
import {CategoryApiService} from "./api-service/category-api-service/category-api.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Category} from "../model/Category";
import {TaskList} from "../model/TaskList";

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

}
