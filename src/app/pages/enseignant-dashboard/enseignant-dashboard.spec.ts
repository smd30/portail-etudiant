import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantDashboard } from './enseignant-dashboard';

describe('EnseignantDashboard', () => {
  let component: EnseignantDashboard;
  let fixture: ComponentFixture<EnseignantDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnseignantDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
