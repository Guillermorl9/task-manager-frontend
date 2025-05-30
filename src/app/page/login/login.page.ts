import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  AlertController,
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
import {
  SocialAuthService,
  SocialUser,
  GoogleLoginProvider,
  GoogleSigninButtonDirective
} from '@abacritt/angularx-social-login';
import {UserApp} from "../../model/UserApp";
import {LoginResponse} from "../../model/LoginResponse";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ReactiveFormsModule, IonItem, IonInput, IonLabel, IonButton, RouterLink, GoogleSigninButtonDirective]
})
export class LoginPage implements OnInit{
  // Services
  private loadingCtrl: LoadingController = inject(LoadingController);
  private authService: AuthService = inject(AuthService);
  private socialAuthService: SocialAuthService = inject(SocialAuthService);
  private alertCtrl: AlertController = inject(AlertController);

  // Variables
  formulario: FormGroup;
  email: string = '';
  password: string = '';
  user: SocialUser | null = null;

  constructor(private form: FormBuilder) {
    this.formulario = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })

  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe(async (user) => {
      this.user = user;
      console.log("User logged in:", user);

      if (user && user.idToken) {
        const loading = await this.presentLoading();

        this.authService.loginWithGoogle(user.idToken).subscribe({
          next: async (response: LoginResponse) => {
            await loading.dismiss();
            console.log('Login con Google exitoso:', response);

            const appUser: UserApp = response.user;

            localStorage.setItem('access_token', response.token);
            localStorage.setItem('user', JSON.stringify(appUser));

          },
          error: async (err) => {
            await loading.dismiss();
            console.error('Error login Google:', err);
            alert('Error al iniciar sesión con Google');
          }
        });
      }
    });
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
          const message: string = error?.error?.message || 'Incorrect email or password';
          const alert = await this.alertCtrl.create({
            header: 'Login error',
            message: message,
            buttons: ['Accept']
          });
          await alert.present();
        }
      });
      console.log(email, password);
    } catch (error) {
      console.error("Error initializing LoginPage", error);
      await loading.dismiss();
    }

  }

  signInWithGoogle(user: SocialUser) {
    this.user = user;
    console.log('Google user:', user);
  }

  onGoogleLoginError(error: any) {
    console.error('Google login error', error);
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
