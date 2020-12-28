import { TestBed } from '@angular/core/testing';

import { AibizhiService } from './aibizhi.service';

describe('AibizhiService', () => {
  let service: AibizhiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AibizhiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
