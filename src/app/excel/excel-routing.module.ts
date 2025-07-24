import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelPage } from './excel.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelPageRoutingModule {}
