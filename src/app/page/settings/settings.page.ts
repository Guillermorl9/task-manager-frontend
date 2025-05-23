import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonButton,
  IonIcon,
  IonNote
} from '@ionic/angular/standalone';
import { CustomHeaderComponent } from "../../component/custom-header/custom-header.component";
import { addIcons } from 'ionicons';
import {
  personOutline,
  optionsOutline,
  colorPaletteOutline,
  cloudOutline,
  cameraOutline,
  logOutOutline
} from 'ionicons/icons';
import {UserApp} from "../../model/UserApp";
import {UserSettings} from "../../model/UserSettings";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CustomHeaderComponent,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonToggle,
    IonButton,
    IonIcon,
    IonNote
  ]
})
export class SettingsPage {
  // Services
  private authService: AuthService = inject(AuthService);

  userProfile: UserApp = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    photoUrl: 'https://i.pravatar.cc/300'
  };

  settings: UserSettings = {
    darkMode: false,
    themeColor: '#4F6DF5',
    defaultList: 'My Tasks',
    showCompletedTasks: true,
    remindDueDates: true,
    syncEnabled: true
  };

  constructor() {
    addIcons({personOutline, optionsOutline, colorPaletteOutline, cloudOutline, cameraOutline, logOutOutline});
  }

  logout(): void {
    this.authService.logout();
  }

}
