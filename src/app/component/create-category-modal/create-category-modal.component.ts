import { Component, ViewChild } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent, IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { closeOutline, folderOutline, starOutline, heartOutline, briefcaseOutline, homeOutline, barbellOutline, bedOutline, bicycleOutline, cartOutline, callOutline, schoolOutline} from 'ionicons/icons';

@Component({
  selector: 'app-create-category-modal',
  templateUrl: './create-category-modal.component.html',
  styleUrls: ['./create-category-modal.component.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    ReactiveFormsModule,
    CommonModule,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle
  ]
})
export class CreateCategoryModalComponent {
  // Decorators
  @ViewChild('createCategoryModal') createCategoryModal!: IonModal;

  // Variables
  createCategoryForm: FormGroup;
  buttonCreateCategoryDisabled: boolean = true;

  icons = [
    { name: 'folder-outline', label: 'Folder' },
    { name: 'star-outline', label: 'Star' },
    { name: 'heart-outline', label: 'Heart' },
    { name: 'briefcase-outline', label: 'Work' }
  ];

  constructor(private form: FormBuilder) {
    addIcons({ closeOutline, folderOutline, starOutline, heartOutline, briefcaseOutline, homeOutline, barbellOutline, bedOutline, bicycleOutline, cartOutline, callOutline, schoolOutline });

    this.createCategoryForm = this.form.group({
      title: ['', [Validators.required]],
      icon: ['folder-outline']
    });

    this.createCategoryForm.valueChanges.subscribe(() => {
      this.buttonCreateCategoryDisabled = !this.createCategoryForm.get('title')?.value;
    });
  }

  async openCategoryModal() {
    this.createCategoryForm.reset({
      title: '',
      icon: 'folder-outline'
    });

    await this.createCategoryModal.present();
    return this.createCategoryModal.onDidDismiss();
  }

  async cancelCreateCategory(): Promise<void> {
    this.createCategoryForm.reset({
      title: '',
      icon: 'folder-outline'
    });

    await this.createCategoryModal.dismiss(null, 'cancel');
  }

  createCategory(): void {
    if (this.createCategoryForm.invalid) {
      this.createCategoryForm.markAllAsTouched();
      return;
    }

    const categoryData = { ...this.createCategoryForm.value };

    this.createCategoryForm.reset({
      title: '',
      icon: 'folder-outline'
    });

    this.createCategoryModal.dismiss(categoryData, 'confirm');
  }
}
