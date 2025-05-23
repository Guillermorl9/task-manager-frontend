import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const token: string = localStorage.getItem('access_token') || '';
  if (token) {
    return true;
  } else {
    const router: Router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};
