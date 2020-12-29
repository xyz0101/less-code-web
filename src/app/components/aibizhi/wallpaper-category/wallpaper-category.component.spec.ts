import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpaperCategoryComponent } from './wallpaper-category.component';

describe('WallpaperCategoryComponent', () => {
  let component: WallpaperCategoryComponent;
  let fixture: ComponentFixture<WallpaperCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallpaperCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallpaperCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
