import {Component, Input, ViewChild} from '@angular/core';
import {addIcons} from "ionicons";
import { addOutline, todayOutline, calendarOutline, checkmarkDoneOutline, closeOutline, timeOutline, readerOutline, reorderThreeOutline } from "ionicons/icons";
import {FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {
  IonApp, IonButton, IonButtons,
  IonCheckbox, IonContent, IonDatetime, IonHeader, IonIcon,
  IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonModal, IonPopover, IonRouterLink,
  IonRouterOutlet,
  IonSelect,
  IonSelectOption,
  IonTextarea, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";
import {Task} from "../../model/Task";

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  imports: [RouterModule, IonApp, ReactiveFormsModule, IonTextarea, IonCheckbox, IonSelect, IonSelectOption, IonRouterOutlet, FormsModule, CommonModule, IonInput, IonDatetime, IonItem, IonList, IonContent, IonMenu, IonRouterLink, IonIcon, IonButton, IonLabel, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonListHeader, IonPopover],
  standalone: true
})
export class CreateTaskModalComponent {
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
  showDatePopover: boolean = false;
  showTimePopover: boolean = false;
  datePopoverEvent: any;
  timePopoverEvent: any;

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

  openTaskModal(task?: Task) {
    this.createTaskForm.reset({
      title: '',
      date: '',
      time: '',
      description: '',
      list: 'list1'
    });

    this.allDay = false;
    this.formattedDate = '';
    this.formattedTime = '';
    this.selectedDate = '';
    this.selectedTime = '';

    if (task) {
      this.createTaskForm.patchValue({
        title: task.title || '',
        description: task.description || '',
        list: 'list1'
      });

      if (task.date) {
        this.selectedDate = task.date;
        const date: Date = new Date(task.date);
        this.formattedDate = date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
        this.createTaskForm.patchValue({ date: task.date });
      }

      if (task.time) {
        const today: Date = new Date();
        const [hours, minutes] = task.time.split(':');
        today.setHours(parseInt(hours), parseInt(minutes));

        this.selectedTime = today.toISOString();
        this.formattedTime = today.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
        });
        this.createTaskForm.patchValue({ time: this.selectedTime });
      } else {
        this.allDay = true;
      }
    }

    this.createTaskModal.present();
    return this.createTaskModal.onDidDismiss();
  }

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
  openDatePopover(ev: Event): void {
    this.datePopoverEvent = ev;
    this.showDatePopover = true;
  }

  openTimePopover(ev: Event): void {
    this.timePopoverEvent = ev;
    this.showTimePopover = true;
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

    if (this.allDay) {
      this.formattedTime = '';
      this.createTaskForm.patchValue({
        time: ''
      });
    }
  }

  // createTaskForm: confirm button
  createTask(): void {
    if(this.createTaskForm.invalid) {
      this.createTaskForm.markAllAsTouched();
      return;
    }

    const taskData = {...this.createTaskForm.value};

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

    this.createTaskModal.dismiss(taskData, 'confirm');
  }
}
