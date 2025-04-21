import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import {CustomHeaderComponent} from "../../component/custom-header/custom-header.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, CustomHeaderComponent],
})
export class HomePage {
  constructor() {}
}
