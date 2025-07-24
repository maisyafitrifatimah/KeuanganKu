import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PinGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const pin = localStorage.getItem('userPin');
    console.log('PIN:', pin); 
    if (!pin) {
      this.router.navigate(['/pin']);
      return false; 
    }
    return true; 
  }
  
}
