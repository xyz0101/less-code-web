import { TestBed } from '@angular/core/testing';

import { FileToolsService } from './file-tools.service';

describe('FileToolsService', () => {
  let service: FileToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
