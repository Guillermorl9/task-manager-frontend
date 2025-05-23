import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const noAuthGuard: CanActivateFn = (route, state) => {
  const token: string = localStorage.getItem('access_token') || '';
  const router: Router = inject(Router);
  if (token) {
    router.navigate(['/home']);
    return false;
  }
  return true;
};
