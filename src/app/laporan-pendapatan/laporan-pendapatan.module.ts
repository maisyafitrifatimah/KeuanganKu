import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NgChartsModule } from 'ng2-charts';

import { LaporanPendapatanPageRoutingModule } from './laporan-pendapatan-routing.module';

import { LaporanPendapatanPage } from './laporan-pendapatan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    LaporanPendapatanPageRoutingModule
  ],
  declarations: [LaporanPendapatanPage]
})
export class LaporanPendapatanPageModule {}
