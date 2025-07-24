import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { PostProvider } from '../../provider/post-provider';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false,
})

export class Tab4Page {

  constructor(private navCtrl: NavController) {}

  bukaHalaman(menu: string) {
    switch(menu) {
      case 'rekening':
        this.navCtrl.navigateForward('/pengaturan-rekening');
        break;
      case 'kategori':
        this.navCtrl.navigateForward('/pengaturan-kategori');
        break;
      case 'pin':
        this.navCtrl.navigateForward('/pin');
        break;
      case 'excel':
        this.navCtrl.navigateForward('/excel');
        break;
      case 'penilaian':
        window.open('https://play.google.com/store', '_system');
        break;
      case 'bagikan':
        navigator.share({ title: 'Aplikasi Keuangan', text: 'Coba aplikasi ini!', url: 'https://example.com' });
        break;
      case 'info':
        this.navCtrl.navigateForward('/info');
        break;
    }
  }
}
