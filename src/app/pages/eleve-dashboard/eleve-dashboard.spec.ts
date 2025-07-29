import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveDashboard } from './eleve-dashboard';

describe('EleveDashboard', () => {
  let component: EleveDashboard;
  let fixture: ComponentFixture<EleveDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleveDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleveDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
