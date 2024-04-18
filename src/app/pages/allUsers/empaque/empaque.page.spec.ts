import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpaquePage } from './empaque.page';

describe('EmpaquePage', () => {
  let component: EmpaquePage;
  let fixture: ComponentFixture<EmpaquePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EmpaquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
