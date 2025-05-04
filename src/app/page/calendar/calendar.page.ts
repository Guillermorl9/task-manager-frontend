import { Component } from '@angular/core';
import {IonContent} from '@ionic/angular/standalone';
import {CustomHeaderComponent} from "../../component/custom-header/custom-header.component";
import {TaskScheduleComponent} from "../../component/task-schedule/task-schedule.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, CustomHeaderComponent, TaskScheduleComponent]
})
export class CalendarPage{
  selectedDate: Date = new Date();

  constructor() { }

  onDateSelected(date: Date) {
    this.selectedDate = date;
    console.log('Fecha seleccionada:', date);
  }

}
