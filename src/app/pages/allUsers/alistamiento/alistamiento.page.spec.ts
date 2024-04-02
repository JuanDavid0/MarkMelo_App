import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlistamientoPage } from './alistamiento.page';

describe('AlistamientoPage', () => {
  let component: AlistamientoPage;
  let fixture: ComponentFixture<AlistamientoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AlistamientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
