import {inject, Injectable} from '@angular/core';
import {TaskApiService} from "./api-service/task-api-service/task-api.service";
import {TaskListApiService} from "./api-service/task-list-api-service/task-list-api.service";
import {CategoryApiService} from "./api-service/category-api-service/category-api.service";
import {BehaviorSubject, Observable} from "rxjs";
import {Category} from "../model/Category";

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
    const currentCategories = this.categories.getValue();
    this.categories.next([...currentCategories, category]);
  }

}
