import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-verify-pin',
  templateUrl: 'verify-pin.page.html',
  styleUrls: ['verify-pin.page.scss'],
  standalone: false,
})
export class VerifyPinPage {
  pin: string = '';
  storedPin: string = '';
  isError: boolean = false;

  dots: number[] = [1, 2, 3, 4, 5, 6];
  keypad: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  constructor(private router: Router, private alertController: AlertController) {}

  ionViewWillEnter() {
    this.storedPin = localStorage.getItem('userPin') || '';
    
    if (!this.storedPin) {
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    }
  }

  pressKey(num: number) {
    if (this.pin.length < 6) {
      this.pin += num.toString();
    }
  }

  clearPin() {
    this.pin = '';
  }

  async checkPin() {
    if (this.pin === this.storedPin) {
      this.router.navigateByUrl('/tabs/tab1', { replaceUrl: true });
    } else {
      this.isError = true;
      setTimeout(() => {
        this.isError = false;
        this.pin = '';
      }, 500);
      this.showAlert('PIN salah! Coba lagi.');
    }
  }

  async forgotPin() {
    localStorage.removeItem('userPin');
    this.showAlert('PIN direset. Silakan atur ulang PIN.');
    this.router.navigateByUrl('/pin', { replaceUrl: true });
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Informasi',
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
