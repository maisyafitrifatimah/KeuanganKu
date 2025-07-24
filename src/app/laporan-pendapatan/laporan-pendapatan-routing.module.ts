import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaporanPendapatanPage } from './laporan-pendapatan.page';

const routes: Routes = [
  {
    path: '',
    component: LaporanPendapatanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaporanPendapatanPageRoutingModule {}
