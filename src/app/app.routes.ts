import { Routes } from '@angular/router';
import {authGuard} from "./guard/auth.guard";
import {noAuthGuard} from "./guard/no-auth.guard";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./page/home/home.page').then((m) => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'calendar',
    loadComponent: () => import('./page/calendar/calendar.page').then( m => m.CalendarPage),
    canActivate: [authGuard]
  },
  {
    path: 'tasks-lists',
    loadComponent: () => import('./page/tasks-lists/tasks-lists.page').then( m => m.TasksListsPage),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./page/login/login.page').then( m => m.LoginPage),
    canActivate: [noAuthGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./page/register/register.page').then( m => m.RegisterPage),
    canActivate: [noAuthGuard]
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./page/recover-password/recover-password.page').then( m => m.RecoverPasswordPage),
    canActivate: [noAuthGuard]
  },
  {
    path: 'settings',
    loadComponent: () => import('./page/settings/settings.page').then( m => m.SettingsPage),
    canActivate: [authGuard]
  },

];
