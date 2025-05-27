import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { IonCard, AlertController, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonChip, IonIcon, IonItem, IonLabel, IonText, IonPopover } from "@ionic/angular/standalone";
import {NgForOf, NgIf} from "@angular/common";
import {TaskList} from "../../model/TaskList";
import {Task} from "../../model/Task";
import {CreateTaskModalComponent} from "../create-task-modal/create-task-modal.component";
import { addIcons } from 'ionicons';
import { timeOutline, ellipsisHorizontalOutline, eyeOutline, eyeOffOutline, trashOutline } from 'ionicons/icons';
import {TaskManagerService} from "../../service/task-manager.service";
import {Category} from "../../model/Category";

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
export class TaskListDetailsComponent implements OnInit {
  // Decorators
  @ViewChild('taskDetailsPopover') popover!: IonPopover;
  @ViewChild(CreateTaskModalComponent) taskModal!: CreateTaskModalComponent;

  // Services
  private alertController: AlertController = inject(AlertController);
  private taskManagerService: TaskManagerService = inject(TaskManagerService);

  // Variables
  currentTaskList: TaskList = {title: '', tasks: []};
  isPopoverOpen: boolean = false;
  showCompleted: boolean = true;
  categories: Category[] = [];

  constructor() {
    addIcons({
      timeOutline,
      ellipsisHorizontalOutline,
      eyeOutline,
      eyeOffOutline, trashOutline
    });
  }

  ngOnInit() {
    this.taskManagerService.userCategories$.subscribe((categories) => {
      this.categories = categories;
    })
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;
    if (task.id) {
      this.taskManagerService.updateTask(task.id, task);
    }
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

  async deleteTask(list: TaskList, taskId: number | undefined): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Are you sure you want to eliminate this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            if (taskId) {
              const index: number = list.tasks.findIndex(task => task.id === taskId);
              this.taskManagerService.deleteTask(taskId);
              if (index > -1)
                list.tasks.splice(index, 1);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteTaskList(taskListId: number | undefined): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirm deletion',
      message: 'Are you sure you want to eliminate this to-do list?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Delete',
          handler: () => {
            if (taskListId) {
              this.taskManagerService.deleteTaskList(taskListId);
              this.popover.dismiss();
            }
          }
        }
      ]
    });

    await alert.present();
  }


  getActiveTasks(): Task[] {
    return this.currentTaskList.tasks.filter(task => !task.completed);
  }

  getCompletedTasks(): Task[] {
    return this.currentTaskList.tasks.filter(task => task.completed);
  }
}
