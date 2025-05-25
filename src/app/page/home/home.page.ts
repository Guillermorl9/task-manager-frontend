import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonChip,
  IonProgressBar,
  IonText,
  IonCheckbox, AlertController,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  addOutline,
  checkmarkDoneOutline,
  calendarOutline,
  flagOutline,
  statsChartOutline,
  timeOutline,
  listOutline,
  ellipsisHorizontalOutline,
  eyeOutline, eyeOffOutline, trashOutline
} from 'ionicons/icons';
import { CustomHeaderComponent } from '../../component/custom-header/custom-header.component';
import { Task } from '../../model/Task';
import {CreateTaskModalComponent} from "../../component/create-task-modal/create-task-modal.component";
import {TaskList} from "../../model/TaskList";
import {TaskManagerService} from "../../service/task-manager.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonIcon, IonButton, IonChip, IonProgressBar, IonText, IonCheckbox, CustomHeaderComponent, CreateTaskModalComponent
  ]
})
export class HomePage implements OnInit{
  // Decorators
  @ViewChild(CreateTaskModalComponent) taskModal!: CreateTaskModalComponent;

  // Services
  private alertController: AlertController = inject(AlertController);
  private taskManagerService: TaskManagerService = inject(TaskManagerService);

  // Variables
  today: Date = new Date();
  formattedDate: string;
  completedTasks: number = 3;
  totalTasks: number = 7;
  completionRate: number = this.completedTasks / this.totalTasks;
  showTodayCompleted: boolean = true;
  showUpcomingCompleted: boolean = true;
  todayTasks: Task[] = [];

  todayTaskList: TaskList = {
    title: 'Today \'s Tasks',
    tasks: [],
  }

  upcomingTaskList: TaskList = {
    title: 'Upcoming Tasks',
    tasks: [],
  }

  constructor() {
    addIcons({
      addOutline,
      checkmarkDoneOutline,
      calendarOutline,
      flagOutline,
      statsChartOutline,
      timeOutline,
      listOutline,
      ellipsisHorizontalOutline, eyeOutline, eyeOffOutline, trashOutline
    });

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };
    this.formattedDate = this.today.toLocaleDateString('en-US', options);
  }

  ngOnInit(): void {
    this.taskManagerService.todayTasks$.subscribe(tasks => {
      this.todayTasks = tasks;
      this.totalTasks = tasks.length;
      this.completedTasks = tasks.filter(task => task.completed).length;
      this.completionRate = this.totalTasks ? this.completedTasks / this.totalTasks : 0;
      this.todayTaskList.tasks = tasks;
    })

    this.taskManagerService.upcomingTasks$.subscribe(tasks => {
      this.upcomingTaskList.tasks = tasks;
    })
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;

    this.completedTasks = this.todayTasks.filter(t => t.completed).length;
    this.completionRate = this.completedTasks / this.totalTasks;
  }

  getTimeFromTask(task: Task): string {
    return task.time || 'All day';
  }

  openTaskModal(task?: Task): void {
    this.taskModal.openTaskModal(task);
  }

  async deleteTask(): Promise<void> {
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
          }
        }
      ]
    });

    await alert.present();
  }

  getActiveTasks(taskList: TaskList): Task[] {
    return taskList.tasks.filter(task => !task.completed);
  }

  getCompletedTasks(taskList: TaskList): Task[] {
    return taskList.tasks.filter(task => task.completed);
  }

}
