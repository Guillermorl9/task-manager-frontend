import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  AlertController,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonChip,
  IonContent, IonIcon, IonItem, IonLabel, IonText
} from '@ionic/angular/standalone';
import {CustomHeaderComponent} from "../../component/custom-header/custom-header.component";
import {TaskScheduleComponent} from "../../component/task-schedule/task-schedule.component";
import {CommonModule} from "@angular/common";
import {Task} from "../../model/Task";
import {CreateTaskModalComponent} from "../../component/create-task-modal/create-task-modal.component";
import {addIcons} from "ionicons";
import {ellipsisHorizontalOutline,   eyeOutline, eyeOffOutline, trashOutline } from "ionicons/icons";
import {TaskList} from "../../model/TaskList";
import {TaskManagerService} from "../../service/task-manager.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, CustomHeaderComponent, TaskScheduleComponent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonChip, IonIcon, IonItem, IonLabel, IonText, CreateTaskModalComponent]
})
export class CalendarPage implements OnInit{
  // Decorators
  @ViewChild(CreateTaskModalComponent) taskModal!: CreateTaskModalComponent;

  // Services
  private alertController: AlertController = inject(AlertController);
  private taskManagerService: TaskManagerService = inject(TaskManagerService);

  // Variables
  selectedDate: Date = new Date();
  tasksSelectedDate: boolean = false;
  completedTasks: number = 3;
  totalTasks: number = 7;
  completionRate: number = this.completedTasks / this.totalTasks;
  showCompleted: boolean = true;
  allTasks: Task[] = [];

  constructor() {
    addIcons({ellipsisHorizontalOutline, eyeOutline, eyeOffOutline, trashOutline })
  }

  ngOnInit() {
    this.taskManagerService.userTasks$.subscribe((tasks: Task[]) => {
      this.allTasks = tasks;
      this.completedTasks = this.getCompletedTasks(this.allTasks).length;
      this.totalTasks = this.allTasks.length;
      this.completionRate = this.totalTasks ? this.completedTasks / this.totalTasks : 0;

      if (this.tasksSelectedDate) {
        this.selectedDate = new Date();
      }
      console.log(this.allTasks);
    })
  }

  onDateSelected(date: Date): void {
    this.selectedDate = date;
    this.tasksSelectedDate = true;
    setTimeout(() => {
      const taskCard = document.querySelector('.task-card');
      taskCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  getTasksForSelectedDate(): Task[] {
    const selectedDateStr = this.selectedDate.toDateString();
    return this.allTasks.filter(task =>
      new Date(task.date).toDateString() === selectedDateStr
    );
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;

    const tasksToday: Task[] = this.getTasksForSelectedDate();
    this.completedTasks = tasksToday.filter(t => t.completed).length;
    this.totalTasks = tasksToday.length;
    this.completionRate = this.totalTasks ? this.completedTasks / this.totalTasks : 0;
  }

  getTimeFromTask(task: Task): string {
    return task.time || 'All day';
  }

  openTaskModal(task?: Task): void {
    this.taskModal.openTaskModal(task);
  }

  async deleteTask(taskId: number | undefined): Promise<void> {
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
              this.taskManagerService.deleteTask(taskId);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  getActiveTasks(tasks: Task[]): Task[] {
    return tasks.filter(task => !task.completed);
  }

  getCompletedTasks(tasks: Task[]): Task[] {
    return tasks.filter(task => task.completed);
  }

}
