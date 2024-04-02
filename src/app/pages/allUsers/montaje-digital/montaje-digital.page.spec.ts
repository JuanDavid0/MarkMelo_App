import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MontajeDigitalPage } from './montaje-digital.page';

describe('MontajeDigitalPage', () => {
  let component: MontajeDigitalPage;
  let fixture: ComponentFixture<MontajeDigitalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MontajeDigitalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
