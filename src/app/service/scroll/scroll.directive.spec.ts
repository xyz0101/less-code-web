import { TestBed } from "@angular/core/testing";
import { ScrollDirective } from "./scroll.directive";
describe('ScrollDirective', () => {
  let service: ScrollDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollDirective);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
 