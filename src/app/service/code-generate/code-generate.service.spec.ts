import { TestBed } from '@angular/core/testing';

import { CodeGenerateService } from './code-generate.service';

describe('CodeGenerateService', () => {
  let service: CodeGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
