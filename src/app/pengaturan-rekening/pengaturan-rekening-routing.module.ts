import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengaturanRekeningPage } from './pengaturan-rekening.page';

const routes: Routes = [
  {
    path: '',
    component: PengaturanRekeningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengaturanRekeningPageRoutingModule {}
