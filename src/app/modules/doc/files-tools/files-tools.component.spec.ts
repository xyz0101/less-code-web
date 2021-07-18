import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesToolsComponent } from './files-tools.component';

describe('FilesToolsComponent', () => {
  let component: FilesToolsComponent;
  let fixture: ComponentFixture<FilesToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
