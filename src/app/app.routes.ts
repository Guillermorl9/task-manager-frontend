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
  {
    path: 'login',
    loadComponent: () => import('./page/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./page/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./page/recover-password/recover-password.page').then( m => m.RecoverPasswordPage)
  },

];
