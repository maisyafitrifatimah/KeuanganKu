import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengaturanRekeningPageRoutingModule } from './pengaturan-rekening-routing.module';

import { PengaturanRekeningPage } from './pengaturan-rekening.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengaturanRekeningPageRoutingModule
  ],
  declarations: [PengaturanRekeningPage]
})
export class PengaturanRekeningPageModule {}
