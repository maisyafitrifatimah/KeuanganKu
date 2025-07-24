import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerificationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const pin = localStorage.getItem('userPin');
    if (!pin) {
        return true;
    }
      this.router.navigate(['/verify-pin']);
      return false;
    }
}
