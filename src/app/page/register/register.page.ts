import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  AlertController,
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
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonLabel, IonInput, IonButton, RouterLink]
})
export class RegisterPage {
  // Services
  private loadingCtrl: LoadingController = inject(LoadingController)
  private authService: AuthService = inject(AuthService);
  private alertCtrl: AlertController = inject(AlertController);

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
      const name: string = this.formulario.get('firstName')?.value;
      const lastname: string = this.formulario.get('lastName')?.value;
      const email: string = this.formulario.get('email')?.value;
      const password: string = this.formulario.get('password')?.value;
      this.authService.register({email, password, name, lastname}).subscribe({
        next: async (response) => {
          await loading.dismiss();
        },
        error: async (error) => {
          await loading.dismiss();
          console.error("Register failed", error);
          const message: string = error?.error?.message || 'Email already exists or invalid data';
          const alert = await this.alertCtrl.create({
            header: 'Register error',
            message: message,
            buttons: ['Accept']
          });
          await alert.present();
        }
      });
      await loading.dismiss();
    } catch (error) {
      console.error("Error initializing RegisterPage", error);
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
