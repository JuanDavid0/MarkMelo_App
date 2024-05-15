import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaProductosPage } from './vista-productos.page';

describe('VistaProductosPage', () => {
  let component: VistaProductosPage;
  let fixture: ComponentFixture<VistaProductosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VistaProductosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
