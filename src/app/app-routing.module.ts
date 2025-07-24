import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PinGuard } from './pin.guard';
import { VerificationGuard } from './verification.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'verify-pin', 
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [PinGuard]
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'pengaturan-rekening',
    loadChildren: () => import('./pengaturan-rekening/pengaturan-rekening.module').then( m => m.PengaturanRekeningPageModule)
  },
  {
    path: 'pengaturan-kategori',
    loadChildren: () => import('./pengaturan-kategori/pengaturan-kategori.module').then( m => m.PengaturanKategoriPageModule)
  },
  {
    path: 'pin',
    loadChildren: () => import('./pin/pin.module').then( m => m.PinPageModule)
  },
  {
    path: 'info',
    loadChildren: () => import('./info/info.module').then( m => m.InfoPageModule)
  },
  {
    path: 'excel',
    loadChildren: () => import('./excel/excel.module').then( m => m.ExcelPageModule)
  },
  {
    path: 'verify-pin',
    loadChildren: () => import('./verify-pin/verify-pin.module').then( m => m.VerifyPinPageModule),
    canActivate: [VerificationGuard]
  },
  {
    path: 'laporan-pendapatan',
    loadChildren: () => import('./laporan-pendapatan/laporan-pendapatan.module').then( m => m.LaporanPendapatanPageModule)
  },
  {
    path: 'laporan-pengeluaran',
    loadChildren: () => import('./laporan-pengeluaran/laporan-pengeluaran.module').then( m => m.LaporanPengeluaranPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
