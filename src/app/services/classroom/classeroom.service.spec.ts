import { TestBed } from '@angular/core/testing';

import { ClasseroomService } from './classeroom.service';

describe('ClasseroomService', () => {
  let service: ClasseroomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasseroomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
