import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pin',
  templateUrl: 'pin.page.html',
  styleUrls: ['pin.page.scss'],
  standalone: false,
})
export class PinPage {
  pin: string = '';
  isPinSetupVisible: boolean = false;
  isPinSet: boolean = false;
  dots = [1, 2, 3, 4, 5, 6];
  keypad = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  constructor(private alertController: AlertController) {}

  ionViewWillEnter() {
    this.isPinSet = localStorage.getItem('userPin') ? true : false;
  }

  showPinSetup() {
    this.isPinSetupVisible = true;
    this.pin = '';
  }

  addDigit(num: number) {
    if (this.pin.length < 6) {
      this.pin += num.toString();
    }
  }

  clearPin() {
    this.pin = '';
  }

  async setPin() {
    if (this.pin.length === 6) {
      localStorage.setItem('userPin', this.pin);
      this.isPinSet = true;
      this.isPinSetupVisible = false;
      this.pin = '';
      this.showAlert('PIN berhasil disimpan!');
    } else {
      this.showAlert('PIN harus terdiri dari 6 angka!');
    }
  }

  async deletePin() {
    localStorage.removeItem('userPin');
    this.isPinSet = false;
    this.showAlert('PIN berhasil dihapus!');
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
