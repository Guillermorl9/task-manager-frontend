import {Component, ViewChild} from '@angular/core';
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
  IonCheckbox,
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
  ellipsisHorizontalOutline
} from 'ionicons/icons';
import { CustomHeaderComponent } from '../../component/custom-header/custom-header.component';
import { Task } from '../../model/Task';
import {CreateTaskModalComponent} from "../../component/create-task-modal/create-task-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonIcon, IonButton, IonChip, IonProgressBar, IonText, IonCheckbox, CustomHeaderComponent, CreateTaskModalComponent
  ]
})
export class HomePage {
  // Decorators
  @ViewChild(CreateTaskModalComponent) taskModal!: CreateTaskModalComponent;
  // Variables
  today: Date = new Date();
  formattedDate: string;
  completedTasks: number = 3;
  totalTasks: number = 7;
  completionRate: number = this.completedTasks / this.totalTasks;

  todaysTasks: Task[] = [
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
      date: '2025-05-02',
      description: 'Buy groceries for the week',
      completed: true
    },
    {
      title: 'Prepare presentation',
      date: '2025-05-02',
      time: '16:00',
      description: 'Prepare slides for tomorrow\'s presentation',
      completed: false
    }
  ];

  upcomingTasks: Task[] = [
    {
      title: 'Client meeting',
      date: '2025-05-03',
      time: '11:00',
      description: 'Meeting with new client to discuss project requirements',
      completed: false
    },
    {
      title: 'Dentist appointment',
      date: '2025-05-04',
      time: '14:30',
      description: 'Regular checkup',
      completed: false
    }
  ];

  constructor() {
    addIcons({
      addOutline,
      checkmarkDoneOutline,
      calendarOutline,
      flagOutline,
      statsChartOutline,
      timeOutline,
      listOutline,
      ellipsisHorizontalOutline
    });

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };
    this.formattedDate = this.today.toLocaleDateString('en-US', options);
  }

  toggleTaskStatus(task: Task): void {
    task.completed = !task.completed;

    this.completedTasks = this.todaysTasks.filter(t => t.completed).length;
    this.completionRate = this.completedTasks / this.totalTasks;
  }

  getTimeFromTask(task: Task): string {
    return task.time || 'All day';
  }

  openModal(task?: Task): void {
    this.taskModal.openModal(task);
  }


}
