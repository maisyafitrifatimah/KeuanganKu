import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExcelPage } from './excel.page';

describe('ExcelPage', () => {
  let component: ExcelPage;
  let fixture: ComponentFixture<ExcelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
