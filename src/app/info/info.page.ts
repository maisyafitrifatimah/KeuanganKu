import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
  standalone: false,
})
export class InfoPage {
  namaApp: string = 'KeuanganKu';
  versiApp: string = '2.5.0';
  developer: string = 'Maisya Fitri Fatimah';
}
