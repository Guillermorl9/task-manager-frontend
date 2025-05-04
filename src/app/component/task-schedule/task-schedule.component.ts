import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {CalendarDay} from "../../model/CalendarDay";

@Component({
  selector: 'app-task-schedule',
  templateUrl: './task-schedule.component.html',
  styleUrls: ['./task-schedule.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
// v1
export class TaskScheduleComponent implements OnInit {

  @Input() selectedDate: Date = new Date();
  @Output() dateSelected: EventEmitter<Date> = new EventEmitter<Date>();

  currentDate: Date = new Date();
  calendar: CalendarDay[][] = [];

  weekDays: string[] = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  monthNames: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor() { }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.calendar = [];
    const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());
    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let week: CalendarDay[] = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() === 0 && week.length > 0) {
        this.calendar.push(week);
        week = [];
      }

      const isSelected = this.selectedDate &&
        this.selectedDate.getDate() === currentDate.getDate() &&
        this.selectedDate.getMonth() === currentDate.getMonth() &&
        this.selectedDate.getFullYear() === currentDate.getFullYear();

      week.push({
        day: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        isCurrentMonth: currentDate.getMonth() === this.currentDate.getMonth(),
        isToday: currentDate.getTime() === today.getTime(),
        isSelected: isSelected
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (week.length > 0) {
      this.calendar.push(week);
    }
  }

  previousMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  selectDate(day: CalendarDay): void {
    this.selectedDate = new Date(day.year, day.month, day.day);
    this.generateCalendar();
    this.dateSelected.emit(this.selectedDate);
  }
}
