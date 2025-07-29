import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bulletins } from './bulletins';

describe('Bulletins', () => {
  let component: Bulletins;
  let fixture: ComponentFixture<Bulletins>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bulletins]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bulletins);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
