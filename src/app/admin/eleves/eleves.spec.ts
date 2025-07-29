import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eleves } from './eleves';

describe('Eleves', () => {
  let component: Eleves;
  let fixture: ComponentFixture<Eleves>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eleves]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Eleves);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
