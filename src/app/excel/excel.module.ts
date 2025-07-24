import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelPageRoutingModule } from './excel-routing.module';

import { ExcelPage } from './excel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelPageRoutingModule
  ],
  declarations: [ExcelPage]
})
export class ExcelPageModule {}
