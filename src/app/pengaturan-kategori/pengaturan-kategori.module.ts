import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengaturanKategoriPageRoutingModule } from './pengaturan-kategori-routing.module';

import { PengaturanKategoriPage } from './pengaturan-kategori.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengaturanKategoriPageRoutingModule
  ],
  declarations: [PengaturanKategoriPage]
})
export class PengaturanKategoriPageModule {}
