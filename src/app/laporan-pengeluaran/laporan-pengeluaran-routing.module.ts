import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaporanPengeluaranPage } from './laporan-pengeluaran.page';

const routes: Routes = [
  {
    path: '',
    component: LaporanPengeluaranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaporanPengeluaranPageRoutingModule {}
