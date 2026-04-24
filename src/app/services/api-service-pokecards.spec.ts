import { TestBed } from '@angular/core/testing';

import { ApiServicePokecards } from './api-service-pokecards';

describe('ApiServicePokecards', () => {
  let service: ApiServicePokecards;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiServicePokecards);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
