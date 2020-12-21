import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseIconComponent } from './choose-icon.component';

describe('ChooseIconComponent', () => {
  let component: ChooseIconComponent;
  let fixture: ComponentFixture<ChooseIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
