import {Component, inject, ViewChild} from '@angular/core';
import {
  IonApp,
  IonContent,
  IonItem,
  IonList,
  IonMenu,
  IonRouterLink,
  IonRouterOutlet,
  IonIcon,
  IonButton,
  IonLabel,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonInput,
  IonDatetime, IonCheckbox, IonSelect, IonSelectOption, IonTextarea, IonListHeader
} from '@ionic/angular/standalone';import {RouterModule} from "@angular/router";
import {addIcons} from "ionicons";
import {addOutline, todayOutline, calendarOutline, checkmarkDoneOutline, closeOutline, timeOutline, readerOutline, reorderThreeOutline} from "ionicons/icons";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ReactiveFormsModule} from "@angular/forms";
import {CreateTaskModalComponent} from "./component/create-task-modal/create-task-modal.component";
import {CreateTasklistModalComponent} from "./component/create-tasklist-modal/create-tasklist-modal.component";
import {TaskManagerService} from "./service/task-manager.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterModule, CreateTaskModalComponent, CreateTasklistModalComponent, IonApp, ReactiveFormsModule, IonTextarea, IonCheckbox, IonSelect, IonSelectOption, IonRouterOutlet, FormsModule, CommonModule, IonInput, IonDatetime, IonItem, IonList, IonContent, IonMenu, IonRouterLink, IonIcon, IonButton, IonLabel, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonListHeader],
})
export class AppComponent {
  // Decorators
  @ViewChild(CreateTaskModalComponent) taskModal!: CreateTaskModalComponent;
  @ViewChild(CreateTasklistModalComponent) taskListModal!: CreateTasklistModalComponent;

  // Services
  private taskManagerService: TaskManagerService = inject(TaskManagerService);
  constructor() {
    addIcons({ addOutline, todayOutline, calendarOutline, checkmarkDoneOutline, closeOutline, timeOutline, readerOutline, reorderThreeOutline });
  }

  openTaskModal(): void {
    this.taskModal.openTaskModal().then((result) => {
      if (result && result.role === 'confirm' && result.data) {
        console.log('Tarea creada:', result.data);
      }
    });
  }

  openTaskListModal(): void {
    this.taskListModal.openTaskListModal().then((result) => {
      if (result && result.role === 'confirm' && result.data) {
        this.taskManagerService.addTaskList(result.data.taskList, result.data.category);
        console.log('Lista creada: ', result.data);
      }
    })
  }

  /*
  handleTaskCreated(taskData: any): void {
    console.log('Tarea creada mediante evento:', taskData);
  }
  */

}
