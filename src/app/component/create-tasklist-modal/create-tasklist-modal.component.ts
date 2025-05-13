import {Component, ViewChild} from '@angular/core';
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


@Component({
  selector: 'app-create-tasklist-modal',
  templateUrl: './create-tasklist-modal.component.html',
  styleUrls: ['./create-tasklist-modal.component.scss'],
  standalone: true,
  imports: [IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, ReactiveFormsModule, CommonModule, IonList, IonItem, IonSelectOption, IonInput, IonSelect, IonCard, IonCardContent]
})
export class CreateTasklistModalComponent {
  // Decorators
  @ViewChild('createTaskListModal') createTaskListModal!: IonModal;

  // Variables
  createTaskListForm: FormGroup;
  buttonCreateTaskListDisabled: boolean = true;

  constructor(private form: FormBuilder) {
    addIcons({closeOutline, folderOutline});

    this.createTaskListForm = this.form.group({
      title: ['', [Validators.required]],
      category: ['category1']
    })

    this.createTaskListForm.valueChanges.subscribe(() => {
      this.buttonCreateTaskListDisabled = !this.createTaskListForm.get('title')?.value;
    });
  }

  async openTaskListModal() {
    this.createTaskListForm.reset({
      title: '',
      category: 'category1'
    });

    await this.createTaskListModal.present();
    return this.createTaskListModal.onDidDismiss();
  }

  async cancelCreateTaskList(): Promise<void> {
    this.createTaskListForm.reset({
      title: '',
      category: 'category1'
    });

    await this.createTaskListModal.dismiss(null, 'cancel');
  }

  createTaskList(): void {
    if(this.createTaskListForm.invalid) {
      this.createTaskListForm.markAllAsTouched();
      return;
    }

    const taskData = {...this.createTaskListForm.value};

    this.createTaskListForm.reset({
      title: '',
      category: 'category1'
    });

    this.createTaskListModal.dismiss(taskData, 'confirm');
  }


}
