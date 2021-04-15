import { TestBed } from '@angular/core/testing';

import { DadesService } from './dades.service';

describe('DadesService', () => {
  let service: DadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
