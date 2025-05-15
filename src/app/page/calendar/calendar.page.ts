import {Component, ViewChild} from '@angular/core';
import {
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
import {ellipsisHorizontalOutline,   eyeOutline, eyeOffOutline } from "ionicons/icons";
import {TaskList} from "../../model/TaskList";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, CustomHeaderComponent, TaskScheduleComponent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCheckbox, IonChip, IonIcon, IonItem, IonLabel, IonText, CreateTaskModalComponent]
})
export class CalendarPage{
  // Decorators
  @ViewChild(CreateTaskModalComponent) taskModal!: CreateTaskModalComponent;
  // Variables
  selectedDate: Date = new Date();
  tasksSelectedDate: boolean = false;
  completedTasks: number = 3;
  totalTasks: number = 7;
  completionRate: number = this.completedTasks / this.totalTasks;
  showCompleted: boolean = true;

  allTasks: Task[] = [
    {
      title: 'Meeting with the team',
      date: '2025-05-02',
      time: '10:00',
      description: 'Weekly update meeting with the development team',
      completed: true
    },
    {
      title: 'Send project proposal',
      date: '2025-05-02',
      time: '13:30',
      description: 'Send the final proposal to the client',
      completed: false
    },
    {
      title: 'Exercise routine',
      date: '2025-05-02',
      completed: true
    },
    {
      title: 'Grocery shopping',
      date: '2025-05-04',
      description: 'Buy groceries for the week',
      completed: true
    },
    {
      title: 'Prepare presentation',
      date: '2025-05-03',
      time: '16:00',
      description: 'Prepare slides for tomorrow\'s presentation',
      completed: false
    }
  ];

  constructor() {
    addIcons({ellipsisHorizontalOutline, eyeOutline, eyeOffOutline })
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

  getActiveTasks(tasks: Task[]): Task[] {
    return tasks.filter(task => !task.completed);
  }

  getCompletedTasks(tasks: Task[]): Task[] {
    return tasks.filter(task => task.completed);
  }

}
