import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
// v2
export class TaskScheduleComponent implements OnInit {

  @Input() selectedDate: Date = new Date();
  @Output() dateSelected: EventEmitter<Date> = new EventEmitter<Date>();

  currentDate: Date = new Date();
  calendar: CalendarDay[][] = [];

  weekDays: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  allTasks: Task[] = [
    {
      title: 'Meeting with the team',
      date: '2025-05-02',
      time: '10:00',
      description: 'Weekly update meeting with the development team',
      completed: true
    },
    {
      title: 'Send project proposal',
      date: '2025-05-02',
      time: '13:30',
      description: 'Send the final proposal to the client',
      completed: false
    },
    {
      title: 'Exercise routine',
      date: '2025-05-02',
      completed: true
    },
    {
      title: 'Grocery shopping',
      date: '2025-05-04',
      description: 'Buy groceries for the week',
      completed: true
    },
    {
      title: 'Prepare presentation',
      date: '2025-05-03',
      time: '16:00',
      description: 'Prepare slides for tomorrow\'s presentation',
      completed: false
    }
  ];

  constructor() {
    addIcons({chevronBackOutline, chevronForwardOutline});
  }

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
