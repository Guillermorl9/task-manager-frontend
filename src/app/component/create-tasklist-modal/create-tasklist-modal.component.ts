import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {
  IonButton,
  IonButtons, IonCard, IonCardContent,
  IonContent,
  IonHeader,
  IonIcon, IonInput, IonItem, IonList,
  IonModal, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {addIcons} from "ionicons";
import {CommonModule} from "@angular/common";
import {closeOutline, folderOutline} from "ionicons/icons";
import {Category} from "../../model/Category";
import {TaskManagerService} from "../../service/task-manager.service";
import {TaskList} from "../../model/TaskList";


@Component({
  selector: 'app-create-tasklist-modal',
  templateUrl: './create-tasklist-modal.component.html',
  styleUrls: ['./create-tasklist-modal.component.scss'],
  standalone: true,
  imports: [IonModal, ReactiveFormsModule, CommonModule, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, ReactiveFormsModule, CommonModule, IonList, IonItem, IonSelectOption, IonInput, IonSelect, IonCard, IonCardContent]
})
export class CreateTasklistModalComponent implements OnInit {
  // Decorators
  @ViewChild('createTaskListModal') createTaskListModal!: IonModal;

  // Services
  private taskManagerService: TaskManagerService = inject(TaskManagerService);

  // Variables
  createTaskListForm: FormGroup;
  buttonCreateTaskListDisabled: boolean = true;
  allCategories: Category[] = [];

  constructor(private form: FormBuilder) {
    addIcons({closeOutline, folderOutline});

    this.createTaskListForm = this.form.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
    })

    this.createTaskListForm.valueChanges.subscribe(() => {
      this.buttonCreateTaskListDisabled = !(this.createTaskListForm.get('title')?.value && this.createTaskListForm.get('category')?.value);
    });
  }

  ngOnInit(): void {
    this.taskManagerService.userCategories$.subscribe((categories: Category[]) => {
      this.allCategories = categories;
    });
  }

  async openTaskListModal() {
    this.createTaskListForm.reset({
      title: '',
      category: ''
    });

    await this.createTaskListModal.present();
    return this.createTaskListModal.onDidDismiss();
  }

  async cancelCreateTaskList(): Promise<void> {
    this.createTaskListForm.reset({
      title: '',
      category: ''
    });

    await this.createTaskListModal.dismiss(null, 'cancel');
  }

  createTaskList(): void {
    if(this.createTaskListForm.invalid) {
      this.createTaskListForm.markAllAsTouched();
      return;
    }
    const selectedCategory: Category | undefined = this.allCategories.find(cat => cat.title === this.createTaskListForm.value.category);
    const categoryId: number | undefined = selectedCategory ? selectedCategory.id : 0;
    const taskList: TaskList = {
      title: this.createTaskListForm.value.title,
      tasks: []
    }

    if(categoryId) {
      this.taskManagerService.addTaskList(categoryId, taskList);
    }

    this.createTaskListForm.reset({
      title: '',
      category: ''
    });

    this.createTaskListModal.dismiss({ taskList, category: selectedCategory }, 'confirm');
  }


}
