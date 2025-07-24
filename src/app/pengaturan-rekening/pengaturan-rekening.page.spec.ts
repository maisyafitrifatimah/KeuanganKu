import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PengaturanRekeningPage } from './pengaturan-rekening.page';

describe('PengaturanRekeningPage', () => {
  let component: PengaturanRekeningPage;
  let fixture: ComponentFixture<PengaturanRekeningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PengaturanRekeningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
