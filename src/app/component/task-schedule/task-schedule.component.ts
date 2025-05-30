import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import {CalendarDay} from "../../model/CalendarDay";
import {addIcons} from "ionicons";
import {chevronBackOutline, chevronForwardOutline} from "ionicons/icons";
import {Task} from "../../model/Task";

@Component({
  selector: 'app-task-schedule',
  templateUrl: './task-schedule.component.html',
  styleUrls: ['./task-schedule.component.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})

export class TaskScheduleComponent implements OnInit, OnChanges {

  @Input() selectedDate: Date = new Date();
  @Output() dateSelected: EventEmitter<Date> = new EventEmitter<Date>();
  @Input() allTasks: Task[] = [];

  currentDate: Date = new Date();
  calendar: CalendarDay[][] = [];

  weekDays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  constructor() {
    addIcons({chevronBackOutline, chevronForwardOutline});
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['allTasks']) {
      this.generateCalendar();
    }
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

  getTasksCountForDay(day: CalendarDay): number {
    const selectedDate = new Date(day.year, day.month, day.day);
    selectedDate.setHours(0, 0, 0, 0);
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    return this.allTasks.filter(task => {
      const taskDate = new Date(task.date);
      taskDate.setHours(0, 0, 0, 0);
      const taskDateStr = taskDate.toISOString().split('T')[0];

      return taskDateStr === selectedDateStr;
    }).length;
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
