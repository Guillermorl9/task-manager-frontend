import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },  {
    path: 'calendar',
    loadComponent: () => import('./page/calendar/calendar.page').then( m => m.CalendarPage)
  },
  {
    path: 'tasks-lists',
    loadComponent: () => import('./page/tasks-lists/tasks-lists.page').then( m => m.TasksListsPage)
  },

];
