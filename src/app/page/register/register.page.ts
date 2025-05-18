import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader, IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  LoadingController
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonLabel, IonInput, IonButton, RouterLink]
})
export class RegisterPage {
  // Services
  private loadingCtrl: LoadingController = inject(LoadingController)

  // Variables
  formulario: FormGroup;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private form: FormBuilder) {
    this.formulario = this.form.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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
      const firstName: string = this.formulario.get('firstName')?.value;
      const lastName: string = this.formulario.get('lastName')?.value;
      const email: string = this.formulario.get('email')?.value;
      const password: string = this.formulario.get('password')?.value;
      await loading.dismiss();
      console.log(firstName, lastName, email, password);
    } catch (error) {
      console.error("Error initializing RegisterPage", error);
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
