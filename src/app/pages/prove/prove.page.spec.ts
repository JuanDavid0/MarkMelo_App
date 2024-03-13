import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProvePage } from './prove.page';

describe('ProvePage', () => {
  let component: ProvePage;
  let fixture: ComponentFixture<ProvePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProvePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
