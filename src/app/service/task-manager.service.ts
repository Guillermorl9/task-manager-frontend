import { inject, Injectable } from '@angular/core';
import { CategoryApiService } from './api-service/category-api-service/category-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../model/Category';
import {TaskListApiService} from "./api-service/task-list-api-service/task-list-api.service";
import {TaskApiService} from "./api-service/task-api-service/task-api.service";
import {TaskList} from "../model/TaskList";
import {Task} from "../model/Task";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TaskManagerService {
  // Services
  private categoryApiService: CategoryApiService = inject(CategoryApiService);
  private taskListApiService: TaskListApiService = inject(TaskListApiService);
  private taskApiService: TaskApiService = inject(TaskApiService);
  private authService: AuthService = inject(AuthService);

  // Subjects and Observables
  private userCategories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  public userCategories$: Observable<Category[]> = this.userCategories.asObservable();

  private userTasksLists: BehaviorSubject<TaskList[]> = new BehaviorSubject<TaskList[]>([]);
  public userTasksLists$: Observable<TaskList[]> = this.userTasksLists.asObservable();

  private userTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public userTasks$: Observable<Task[]> = this.userTasks.asObservable();

  private todayTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public todayTasks$: Observable<Task[]> = this.todayTasks.asObservable();

  private upcomingTasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public upcomingTasks$: Observable<Task[]> = this.upcomingTasks.asObservable();

  constructor() {
    this.authService.currentUser$.subscribe((user => {
      if (user) {
        this.loadUserData();
      } else {
        this.clearUserData();
      }
    }))

  }

  private loadUserData(): void {
    this.categoryApiService.getCategories().subscribe({
      next: categories => this.userCategories.next(categories),
      error: err => console.error('Error al cargar categorías:', err)
    });

    this.taskApiService.getTodayTasks().subscribe({
      next: tasks => this.todayTasks.next(tasks),
      error: err => console.error('Error al cargar tareas de hoy:', err)
    });

    this.taskApiService.getUpcomingTasks().subscribe({
      next: tasks => this.upcomingTasks.next(tasks),
      error: err => console.error('Error al cargar tareas futuras:', err)
    })

    this.taskListApiService.getAllTaskLists().subscribe({
      next: tasksLists => this.userTasksLists.next(tasksLists),
      error: err => console.error('Error al cargar taskLists:', err)
    })
  }

  clearUserData(): void {
    this.userCategories.next([]);
    this.userTasksLists.next([]);
    this.userTasks.next([]);
  }

  // Categories

  loadCategories(): void {
    this.categoryApiService.getCategories().subscribe({
      next: categories => this.userCategories.next(categories),
      error: err => console.error('Error al cargar categorías:', err)
    });
  }

  addCategory(category: Category): void {
    this.categoryApiService.createCategory(category).subscribe({
      next: createdCategory => {
        this.userCategories.next([...this.userCategories.value, createdCategory]);
      },
      error: err => console.error('Error al crear categoría:', err)
    });
  }

  updateCategory(categoryId: number, updatedData: Category): void {
    this.categoryApiService.updateCategory(categoryId, updatedData).subscribe({
      next: updatedCategory => {
        const updatedList: Category[] = this.userCategories.value.map(cat =>
          cat.id === categoryId ? updatedCategory : cat
        );
        this.userCategories.next(updatedList);
      },
      error: err => console.error('Error al actualizar categoría:', err)
    });
  }

  deleteCategory(categoryId: number): void {
    this.categoryApiService.deleteCategory(categoryId).subscribe({
      next: () => {
        const filtered: Category[] = this.userCategories.value.filter(cat => cat.id !== categoryId);
        this.userCategories.next(filtered);
        this.userTasksLists.next([]);
        this.userTasks.next([]);
      },
      error: err => console.error('Error al eliminar categoría:', err)
    });
  }

  // Tasks Lists

  loadTaskLists(categoryId: number): void {
    this.taskListApiService.getTaskListsByCategory(categoryId).subscribe({
      next: taskLists => this.userTasksLists.next(taskLists),
      error: err => console.error('Error al cargar listas:', err)
    });
  }

  addTaskList(categoryId: number, taskList: TaskList): void {
    this.taskListApiService.createTaskList(categoryId, taskList).subscribe({
      next: createdList => {
        this.userTasksLists.next([...this.userTasksLists.value, createdList]);
        const updatedCategories = this.userCategories.value.map(cat => {
          if (cat.id === categoryId) {
            return {
              ...cat,
              lists: [...(cat.lists || []), createdList] // Usar createdList, no taskList
            };
          }
          return cat;
        });
        this.userCategories.next(updatedCategories);
      },
      error: err => console.error('Error al crear lista:', err)
    });
  }

  updateTaskList(taskListId: number, updatedData: TaskList): void {
    this.taskListApiService.updateTaskList(taskListId, updatedData).subscribe({
      next: updatedList => {
        const updated: TaskList[] = this.userTasksLists.value.map(list =>
          list.id === taskListId ? updatedList : list
        );
        this.userTasksLists.next(updated);
      },
      error: err => console.error('Error al actualizar lista:', err)
    });
  }

  deleteTaskList(taskListId: number): void {
    this.taskListApiService.deleteTaskList(taskListId).subscribe({
      next: () => {
        const filteredTaskLists = this.userTasksLists.value.filter(list => list.id !== taskListId);
        this.userTasksLists.next(filteredTaskLists);
        const updatedCategories = this.userCategories.value.map(cat => ({
          ...cat,
          lists: cat.lists?.filter(list => list.id !== taskListId) || []
        }));
        this.userCategories.next(updatedCategories);
        this.userTasks.next([]);
      },
      error: err => console.error('Error al eliminar lista:', err)
    });
  }

  findCategoryByTaskListId(taskListId: number): Category | undefined {
    return this.userCategories.value.find(category =>
      category.lists.some(list => list.id === taskListId)
    );
  }

  // Tasks

  loadTasks(taskListId: number): void {
    this.taskApiService.getTasksByList(taskListId).subscribe({
      next: tasks => this.userTasks.next(tasks),
      error: err => console.error('Error al cargar tareas:', err)
    });
  }

  addTask(taskListId: number, task: Task): void {
    this.taskApiService.createTask(taskListId, task).subscribe({
      next: createdTask => {
        this.userTasks.next([...this.userTasks.value, createdTask]);

        const updatedTaskLists = this.userTasksLists.value.map(list => {
          if (list.id === taskListId) {
            return {
              ...list,
              tasks: [...(list.tasks || []), createdTask]
            };
          }
          return list;
        });
        this.userTasksLists.next(updatedTaskLists);

        const updatedCategories = this.userCategories.value.map(cat => ({
          ...cat,
          lists: cat.lists?.map(list => {
            if (list.id === taskListId) {
              return {
                ...list,
                tasks: [...(list.tasks || []), createdTask]
              };
            }
            return list;
          }) || []
        }));
        this.userCategories.next(updatedCategories);

        if (this.isTaskForToday(createdTask)) {
          this.todayTasks.next([...this.todayTasks.value, createdTask]);
        }
        if (this.isTaskUpcoming(createdTask)) {
          this.upcomingTasks.next([...this.upcomingTasks.value, createdTask]);
        }
      },
      error: err => console.error('Error al crear tarea:', err)
    });
  }

  private isTaskForToday(task: Task): boolean {
    if (!task.date) return false;

    const today = new Date();
    const taskDate = new Date(task.date);

    return taskDate.toDateString() === today.toDateString();
  }

  private isTaskUpcoming(task: Task): boolean {
    if (!task.date) return false;

    const today = new Date();
    const taskDate = new Date(task.date);

    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate > today;
  }

  updateTask(taskId: number, updatedData: Task): void {
    this.taskApiService.updateTask(taskId, updatedData).subscribe({
      next: updatedTask => {

        const updated: Task[] = this.userTasks.value.map(task =>
          task.id === taskId ? updatedTask : task
        );
        this.userTasks.next(updated);

      },
      error: err => console.error('Error al actualizar tarea:', err)
    });
  }

  deleteTask(taskId: number): void {
    this.taskApiService.deleteTask(taskId).subscribe({
      next: () => {

        const filteredTasks = this.userTasks.value.filter(t => t.id !== taskId);
        this.userTasks.next(filteredTasks);

        const filteredTodayTasks: Task[] = this.todayTasks.value.filter(t => t.id !== taskId);
        this.todayTasks.next(filteredTodayTasks);

        const filteredUpcomingTasks: Task[] = this.upcomingTasks.value.filter(t => t.id !== taskId);
        this.upcomingTasks.next(filteredUpcomingTasks);

        const updatedTaskLists = this.userTasksLists.value.map(list => ({
          ...list,
          tasks: list.tasks?.filter(task => task.id !== taskId) || []
        }));
        this.userTasksLists.next(updatedTaskLists);

        const updatedCategories = this.userCategories.value.map(cat => ({
          ...cat,
          lists: cat.lists?.map(list => ({
            ...list,
            tasks: list.tasks?.filter(task => task.id !== taskId) || []
          })) || []
        }));
        this.userCategories.next(updatedCategories);
      },
      error: err => console.error('Error al eliminar tarea:', err)
    });
  }
}
