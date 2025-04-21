import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonItem,
  IonList, IonMenu, IonRouterLink,
  IonRouterOutlet, IonIcon, IonButton, IonLabel, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
} from '@ionic/angular/standalone';
import {RouterModule} from "@angular/router";
import {addIcons} from "ionicons";
import {addOutline, todayOutline, calendarOutline, checkmarkDoneOutline} from "ionicons/icons";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterModule, IonApp, IonRouterOutlet, IonItem, IonList, IonContent, IonMenu, IonRouterLink, IonIcon, IonButton, IonLabel],
})
export class AppComponent {
  constructor() {
    addIcons({addOutline, todayOutline, calendarOutline, checkmarkDoneOutline});
  }
}
