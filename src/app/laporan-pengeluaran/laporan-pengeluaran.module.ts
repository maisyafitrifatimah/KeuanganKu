import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgChartsModule } from 'ng2-charts';
import { LaporanPengeluaranPageRoutingModule } from './laporan-pengeluaran-routing.module';

import { LaporanPengeluaranPage } from './laporan-pengeluaran.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    LaporanPengeluaranPageRoutingModule
  ],
  declarations: [LaporanPengeluaranPage]
})
export class LaporanPengeluaranPageModule {}
