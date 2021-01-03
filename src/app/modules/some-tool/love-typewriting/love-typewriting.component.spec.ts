import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoveTypewritingComponent } from './love-typewriting.component';

describe('LoveTypewritingComponent', () => {
  let component: LoveTypewritingComponent;
  let fixture: ComponentFixture<LoveTypewritingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoveTypewritingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoveTypewritingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
