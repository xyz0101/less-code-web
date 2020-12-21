import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseMenuComponent } from './choose-menu.component';

describe('ChooseMenuComponent', () => {
  let component: ChooseMenuComponent;
  let fixture: ComponentFixture<ChooseMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
