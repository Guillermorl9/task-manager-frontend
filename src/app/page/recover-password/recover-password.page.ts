import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar, LoadingController
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterLink, IonButton, IonInput, IonLabel, IonItem, ReactiveFormsModule]
})
export class RecoverPasswordPage {
  // Services
  private loadingCtrl: LoadingController = inject(LoadingController);

  // Variables
  formulario: FormGroup;
  email: string = '';

  constructor(private form: FormBuilder) {
    this.formulario = this.form.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  async onSubmit(): Promise<void> {
    const loading = await this.presentLoading();
    this.formulario.markAllAsTouched();
    if (this.formulario.invalid) {
      await loading.dismiss();
      return;
    }
    try {
      const email: string = this.formulario.get('email')?.value;
      await loading.dismiss();
      console.log(email);
    } catch (error) {
      console.error("Error initializing RecoverPasswordPage", error);
      await loading.dismiss();
    }

  }

  private async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'crescent',
      translucent: true,
      backdropDismiss: false,
    });
    await loading.present();
    return loading;
  }
}
