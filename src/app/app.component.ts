import {Component, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterModule, CreateTaskModalComponent, IonApp, ReactiveFormsModule, IonTextarea, IonCheckbox, IonSelect, IonSelectOption, IonRouterOutlet, FormsModule, CommonModule, IonInput, IonDatetime, IonItem, IonList, IonContent, IonMenu, IonRouterLink, IonIcon, IonButton, IonLabel, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonListHeader],
})
export class AppComponent {
  // Decorators
  @ViewChild(CreateTaskModalComponent) taskModal!: CreateTaskModalComponent;
  constructor() {
    addIcons({ addOutline, todayOutline, calendarOutline, checkmarkDoneOutline, closeOutline, timeOutline, readerOutline, reorderThreeOutline });
  }

  openModal(): void {
    this.taskModal.openModal().then((result) => {
      if (result && result.role === 'confirm' && result.data) {
        console.log('Tarea creada:', result.data);
      }
    });
  }

  /*
  handleTaskCreated(taskData: any): void {
    console.log('Tarea creada mediante evento:', taskData);
  }
  */

}
