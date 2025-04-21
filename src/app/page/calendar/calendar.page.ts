import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import {CustomHeaderComponent} from "../../component/custom-header/custom-header.component";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonContent, CustomHeaderComponent]
})
export class CalendarPage{

  constructor() { }

}
