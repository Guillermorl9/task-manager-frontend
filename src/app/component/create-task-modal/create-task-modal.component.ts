import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {addIcons} from "ionicons";
import { addOutline, todayOutline, calendarOutline, checkmarkDoneOutline, closeOutline, timeOutline, readerOutline, reorderThreeOutline } from "ionicons/icons";
import {FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {
  IonApp, IonButton, IonButtons, IonCard, IonCardContent,
  IonCheckbox, IonContent, IonDatetime, IonHeader, IonIcon,
  IonInput, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonModal, IonPopover, IonRouterLink,
  IonRouterOutlet,
  IonSelect,
  IonSelectOption,
  IonTextarea, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {CommonModule} from "@angular/common";
import {Task} from "../../model/Task";
import {TaskList} from "../../model/TaskList";
import {TaskManagerService} from "../../service/task-manager.service";

@Component({
  selector: 'app-create-task-modal',
  templateUrl: './create-task-modal.component.html',
  styleUrls: ['./create-task-modal.component.scss'],
  imports: [RouterModule, IonCard, IonCardContent, IonApp, ReactiveFormsModule, IonTextarea, IonCheckbox, IonSelect, IonSelectOption, IonRouterOutlet, FormsModule, CommonModule, IonInput, IonDatetime, IonItem, IonList, IonContent, IonMenu, IonRouterLink, IonIcon, IonButton, IonLabel, IonModal, IonHeader, IonToolbar, IonButtons, IonTitle, IonListHeader, IonPopover],
  standalone: true
})
export class CreateTaskModalComponent implements OnInit {
  // Decorators
  @ViewChild('createTaskModal') createTaskModal!: IonModal;

  // Services
  private taskManagerService: TaskManagerService = inject(TaskManagerService);

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
  allTaskLists: TaskList[] = [];

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

  ngOnInit(): void {
    this.taskManagerService.userTasksLists$.subscribe(tasksLists => {
      this.allTaskLists = tasksLists;
    })
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
    if (this.createTaskForm.invalid) {
      this.createTaskForm.markAllAsTouched();
      return;
    }

    // Recortar solo la parte de la fecha, sin hora
    let dateOnly = this.createTaskForm.value.date;
    if (dateOnly && dateOnly.includes('T')) {
      dateOnly = dateOnly.split('T')[0];
    }

    const selectedList: TaskList | undefined = this.allTaskLists.find(list => list.title === this.createTaskForm.value.list);
    const selectedListId: number | undefined = selectedList ? selectedList.id : 0;

    const task: Task = {
      title: this.createTaskForm.value.title,
      description: this.createTaskForm.value.description,
      date: dateOnly,               // Aquí ya va sólo la fecha
      time: this.createTaskForm.value.time,
      completed: false,
    };

    if (selectedListId) {
      this.taskManagerService.addTask(selectedListId, task);
    }

    this.createTaskForm.reset({
      title: '',
      date: '',
      time: '',
      description: '',
      list: 'list1'
    });

    this.createTaskModal.dismiss({ task, list: selectedList }, 'confirm');
  }

}
