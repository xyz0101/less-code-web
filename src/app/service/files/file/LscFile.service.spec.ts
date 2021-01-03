import { TestBed } from '@angular/core/testing';
import { LscFileService } from './LscFile.service';


describe('LscFileService', () => {
  let service: LscFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LscFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
