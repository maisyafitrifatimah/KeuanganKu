import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengaturanKategoriPage } from './pengaturan-kategori.page';

describe('PengaturanKategoriPage', () => {
  let component: PengaturanKategoriPage;
  let fixture: ComponentFixture<PengaturanKategoriPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengaturanKategoriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
