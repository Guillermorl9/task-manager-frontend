import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonIcon,
  IonButton,
  IonBadge,
  IonSearchbar,
  IonRippleEffect
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addCircleOutline,
  ellipsisVerticalOutline,
  searchOutline,
  filterOutline,
  addOutline,
  chevronForwardOutline,
  flagOutline,
  briefcaseOutline,
  homeOutline,
  fitnessOutline,
  schoolOutline,
  peopleOutline,
  timeOutline,
  ellipsisHorizontalOutline
} from 'ionicons/icons';
import { CustomHeaderComponent } from '../../component/custom-header/custom-header.component';
import { TaskList } from '../../model/TaskList';
import {FormsModule} from "@angular/forms";
import {Category} from "../../model/Category";
import {TaskListDetailsComponent} from "../../component/task-list-details/task-list-details.component";

@Component({
  selector: 'app-tasks-lists',
  templateUrl: './tasks-lists.page.html',
  styleUrls: ['./tasks-lists.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonIcon,
    IonButton,
    IonBadge,
    IonSearchbar,
    IonRippleEffect,
    CustomHeaderComponent,
    FormsModule,
    TaskListDetailsComponent
  ]
})
export class TasksListsPage {
  searchQuery: string = '';
  showSearch: boolean = false;
  @ViewChild(TaskListDetailsComponent) taskListDetailsModal!: TaskListDetailsComponent;


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

  allTaskSections: Category[] = [
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

  constructor() {
    addIcons({
      addCircleOutline,
      ellipsisVerticalOutline,
      searchOutline,
      filterOutline,
      addOutline,
      chevronForwardOutline,
      flagOutline,
      briefcaseOutline,
      homeOutline,
      fitnessOutline,
      schoolOutline,
      peopleOutline,
      timeOutline,
      ellipsisHorizontalOutline
    });
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  getCompletedTasksCount(taskList: TaskList): number {
    return taskList.tasks.filter(task => task.completed).length;
  }

  getTasksPercentage(taskList: TaskList): number {
    if (taskList.tasks.length === 0) return 0;
    return (this.getCompletedTasksCount(taskList) / taskList.tasks.length) * 100;
  }

  addNewList(): void {

  }

  openListDetails(taskList: TaskList): void {
    this.taskListDetailsModal.openTaskListPopover(taskList);
  }
}
