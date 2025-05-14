import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../../../model/Category";
import {TaskList} from "../../../model/TaskList";

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {
  private baseUrl: string = 'http://localhost:8080/api';

  //Static data
  personalLists: TaskList[] = [
    {
      title: 'Household Chores',
      tasks: [
        { title: 'Clean kitchen', date: '2025-05-02', completed: false },
        { title: 'Take out trash', date: '2025-05-02', completed: true },
        { title: 'Water plants', date: '2025-05-03', completed: false }
      ]
    },
    {
      title: 'Exercise Routine',
      tasks: [
        { title: 'Morning run', date: '2025-05-02', completed: true },
        { title: 'Gym workout', date: '2025-05-04', completed: false }
      ]
    },
    {
      title: 'Shopping List',
      tasks: [
        { title: 'Buy groceries', date: '2025-05-03', completed: false },
        { title: 'Get new shoes', date: '2025-05-05', completed: false }
      ]
    }
  ];

  workLists: TaskList[] = [
    {
      title: 'Project Tasks',
      tasks: [
        { title: 'Complete UI design', date: '2025-05-02', completed: true },
        { title: 'Write documentation', date: '2025-05-03', completed: false },
        { title: 'Client presentation', date: '2025-05-04', completed: false },
        { title: 'Code review', date: '2025-05-04', completed: false }
      ]
    },
    {
      title: 'Admin Tasks',
      tasks: [
        { title: 'Send weekly report', date: '2025-05-03', completed: false },
        { title: 'Update timesheet', date: '2025-05-02', completed: true }
      ]
    }
  ];

  studyLists: TaskList[] = [
    {
      title: 'Angular Course',
      tasks: [
        { title: 'Complete module 5', date: '2025-05-03', completed: false },
        { title: 'Practice exercises', date: '2025-05-04', completed: false }
      ]
    }
  ];
  constructor() { }
  getCategoriesByUser(userId: number): Category[] {
    return [
      {
        title: 'Personal',
        icon: 'home-outline',
        lists: this.personalLists
      },
      {
        title: 'Work',
        icon: 'briefcase-outline',
        lists: this.workLists
      },
      {
        title: 'Study',
        icon: 'school-outline',
        lists: this.studyLists
      }
    ];
  }

  createCategory(userId: number, category: Category): void {

  }

  deleteCategory(userId: number, categoryId: number): void {

  }

  updateCategory(userId: number, categoryId: number, category: Category): void {

  }
}
