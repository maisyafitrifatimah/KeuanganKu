import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaporanPengeluaranPage } from './laporan-pengeluaran.page';

describe('LaporanPengeluaranPage', () => {
  let component: LaporanPengeluaranPage;
  let fixture: ComponentFixture<LaporanPengeluaranPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanPengeluaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
