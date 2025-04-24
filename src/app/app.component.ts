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
  IonDatetime, IonGrid, IonRow, IonCol, IonCheckbox, IonSelect, IonSelectOption, IonTextarea
} from '@ionic/angular/standalone';
import {RouterModule} from "@angular/router";
import {addIcons} from "ionicons";
import {addOutline, todayOutline, calendarOutline, checkmarkDoneOutline, closeOutline, timeOutline, readerOutline, reorderThreeOutline} from "ionicons/icons";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterModule, IonApp, IonTextarea, IonCheckbox, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonRouterOutlet, FormsModule, CommonModule, IonInput, IonDatetime, IonItem, IonList, IonContent, IonMenu, IonRouterLink, IonIcon, IonButton, IonLabel, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle],
})
export class AppComponent {
  // Decorators
  @ViewChild('createTaskModal') createTaskModal!: IonModal;

  // Variables
  selectedDate: string = '';
  formattedDate: string = '';
  showDatePicker: boolean = false;
  selectedTime: string = '';
  formattedTime: string = '';
  showTimePicker: boolean = false;
  allDay: boolean = false;


  constructor() {
    addIcons({ addOutline, todayOutline, calendarOutline, checkmarkDoneOutline, closeOutline, timeOutline, readerOutline, reorderThreeOutline });
  }

  toggleDatePicker(): void {
    if (this.showDatePicker) {
      this.showDatePicker = false;
    } else {
      this.showTimePicker = false;
      this.showDatePicker = true;
    }
  }

  dateSelected(): void {
    if (this.selectedDate) {
      const date: Date = new Date(this.selectedDate);
      this.formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      this.showDatePicker = false;
    }
  }

  toggleTimePicker(): void {
    if (this.showTimePicker) {
      this.showTimePicker = false;
    } else {
      this.showDatePicker = false;
      this.showTimePicker = true;
    }
  }

  timeSelected(): void {
    if (this.selectedTime) {
      const time = new Date(this.selectedTime);
      this.formattedTime = time.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      });

      this.showTimePicker = false;
    }
  }

  allDayCheck(): void {
    this.showTimePicker = false;
    this.allDay = !this.allDay;
  }

  cancelCreateTask(): void {
    this.allDay = false;
    this.createTaskModal.dismiss(null, 'cancel');
  }

  confirmCreateTask(): void {
    this.createTaskModal.dismiss('confirm', 'confirm');
  }
}
