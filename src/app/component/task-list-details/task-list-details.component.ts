import {Component, ViewChild} from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonChip, IonIcon, IonItem, IonLabel, IonText, IonPopover } from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";
import {TaskList} from "../../model/TaskList";
import {Task} from "../../model/Task";
import {CreateTaskModalComponent} from "../create-task-modal/create-task-modal.component";
import { addIcons } from 'ionicons';
import { timeOutline, ellipsisHorizontalOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';

@Component({
  selector: 'app-task-list-details',
  templateUrl: './task-list-details.component.html',
  styleUrls: ['./task-list-details.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCheckbox,
    IonChip,
    IonIcon,
    IonItem,
    IonLabel,
    IonText,
    IonPopover,
    NgForOf,
    NgIf,
    CreateTaskModalComponent
  ]
})
export class TaskListDetailsComponent {
  // Decorators
  @ViewChild('taskDetailsPopover') popover!: IonPopover;
  @ViewChild(CreateTaskModalComponent) taskModal!: CreateTaskModalComponent;

  // Variables
  currentTaskList: TaskList = {title: '', tasks: []};
  isPopoverOpen: boolean = false;
  showCompleted: boolean = true;

  constructor() {
    addIcons({
      timeOutline,
      ellipsisHorizontalOutline,
      eyeOutline,
      eyeOffOutline
    });
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;
  }

  getTimeFromTask(task: Task): string {
    return task.time || 'All day';
  }

  openTaskListPopover(taskList: TaskList): void {
    this.currentTaskList = taskList;
    this.isPopoverOpen = true;
  }

  openTaskModal(task?: Task): void {
    this.taskModal.openTaskModal(task);
  }

  getActiveTasks(): Task[] {
    return this.currentTaskList.tasks.filter(task => !task.completed);
  }

  getCompletedTasks(): Task[] {
    return this.currentTaskList.tasks.filter(task => task.completed);
  }
}
