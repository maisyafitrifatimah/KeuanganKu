import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LaporanPendapatanPage } from './laporan-pendapatan.page';

describe('LaporanPendapatanPage', () => {
  let component: LaporanPendapatanPage;
  let fixture: ComponentFixture<LaporanPendapatanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LaporanPendapatanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
