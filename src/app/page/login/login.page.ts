import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem, IonLabel,
  IonTitle,
  IonToolbar,
  LoadingController
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonInput, IonLabel, IonButton, RouterLink]
})
export class LoginPage {
  // Services
  private loadingCtrl: LoadingController = inject(LoadingController);
  private authService: AuthService = inject(AuthService);

  // Variables
  formulario: FormGroup;
  email: string = '';
  password: string = '';

  constructor(private form: FormBuilder) {
    this.formulario = this.form.group({
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
      const email: string = this.formulario.get('email')?.value;
      const password: string = this.formulario.get('password')?.value;
      this.authService.login({email, password}).subscribe({
        next: async (response) => {
          await loading.dismiss();
          console.log(response.token);
        },
        error: async (error) => {
          await loading.dismiss();
          console.error("Login failed", error);
        }
      });
      console.log(email, password);
    } catch (error) {
      console.error("Error initializing LoginPage", error);
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
