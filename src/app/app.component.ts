import { Component } from '@angular/core';
import {
  IonApp, IonButtons,
  IonContent, IonHeader,
  IonItem,
  IonList, IonMenu, IonMenuButton, IonRouterLink,
  IonRouterOutlet, IonTitle, IonToolbar,
} from '@ionic/angular/standalone';
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [RouterModule, IonApp, IonRouterOutlet, IonItem, IonList, IonContent, IonMenu, IonRouterLink, IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar],
})
export class AppComponent {
  constructor() {}
}
