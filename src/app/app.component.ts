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
  IonDatetime, IonGrid, IonRow, IonCol, IonCheckbox, IonSelect, IonSelectOption, IonTextarea, IonText
} from '@ionic/angular/standalone';import {RouterModule} from "@angular/router";
import {addIcons} from "ionicons";
import {addOutline, todayOutline, calendarOutline, checkmarkDoneOutline, closeOutline, timeOutline, readerOutline, reorderThreeOutline} from "ionicons/icons";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterModule, IonApp, ReactiveFormsModule, IonText, IonTextarea, IonCheckbox, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonRouterOutlet, FormsModule, CommonModule, IonInput, IonDatetime, IonItem, IonList, IonContent, IonMenu, IonRouterLink, IonIcon, IonButton, IonLabel, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle],
})
export class AppComponent {
  // Decorators
  @ViewChild('createTaskModal') createTaskModal!: IonModal;

  // Variables
  createTaskForm: FormGroup;
  selectedDate: string = '';
  formattedDate: string = '';
  showDatePicker: boolean = false;
  selectedTime: string = '';
  formattedTime: string = '';
  showTimePicker: boolean = false;
  allDay: boolean = false;
  taskButtonDisabled: boolean = true;

  constructor(private form: FormBuilder) {
    addIcons({ addOutline, todayOutline, calendarOutline, checkmarkDoneOutline, closeOutline, timeOutline, readerOutline, reorderThreeOutline });

    this.createTaskForm = this.form.group({
      title: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: [''],
      description: [''],
      list: ['list1'],
    });

    this.createTaskForm.valueChanges.subscribe(() => {
      this.taskButtonDisabled = !(this.createTaskForm.get('title')?.value && this.createTaskForm.get('date')?.value);
    });
  }

  // createTaskForm: cancel button
  cancelCreateTask(): void {
    this.allDay = false;
    this.formattedDate = '';
    this.formattedTime = '';
    this.selectedDate = '';
    this.selectedTime = '';

    this.createTaskForm.reset({
      title: '',
      date: '',
      time: '',
      description: '',
      list: 'list1'
    });

    this.createTaskModal.dismiss(null, 'cancel');
  }

  // createTaskForm: change date
  toggleDatePicker(): void {
    if (this.showDatePicker) {
      this.showDatePicker = false;
    } else {
      this.showTimePicker = false;
      this.showDatePicker = true;
    }
  }

  // createTaskForm: save the selected date
  dateSelected(): void {
    if (this.selectedDate) {
      const date: Date = new Date(this.selectedDate);
      this.formattedDate = date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });

      this.createTaskForm.patchValue({
        date: this.selectedDate
      });

      this.showDatePicker = false;
    }
  }

  // createTaskForm: change time
  toggleTimePicker(): void {
    if (this.showTimePicker) {
      this.showTimePicker = false;
    } else {
      this.showDatePicker = false;
      this.showTimePicker = true;
    }
  }
  // createTaskForm: save the selected time
  timeSelected(): void {
    if (this.selectedTime) {
      const time = new Date(this.selectedTime);
      this.formattedTime = time.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      });

      this.createTaskForm.patchValue({
        time: this.selectedTime
      });

      this.showTimePicker = false;
    }
  }

  // createTaskForm: Checkbox to set a task for the whole day
  allDayCheck(): void {
    this.showTimePicker = false;
    this.allDay = !this.allDay;

    if (this.allDay) {
      this.formattedTime = '';
      this.createTaskForm.patchValue({
        time: ''
      });
    }
  }

  // createTaskForm: Check if the form is valid
  hasErrors(controlName: string, errorName: string): boolean {
    const control = this.createTaskForm.get(controlName);
    return control != null;
  }

  // createTaskForm: confirm button
  createTask(): void {
    if(this.createTaskForm.invalid) {
      this.createTaskForm.markAllAsTouched();
      return;
    }

    this.formattedDate = '';
    this.formattedTime = '';
    this.selectedDate = '';
    this.selectedTime = '';
    this.allDay = false;

    this.createTaskForm.reset({
      title: '',
      date: '',
      time: '',
      description: '',
      list: 'list1'
    });

    this.createTaskModal.dismiss('confirm', 'confirm');
  }
}
