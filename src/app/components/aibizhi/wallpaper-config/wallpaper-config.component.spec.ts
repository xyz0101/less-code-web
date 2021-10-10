import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpaperConfigComponent } from './wallpaper-config.component';

describe('WallpaperConfigComponent', () => {
  let component: WallpaperConfigComponent;
  let fixture: ComponentFixture<WallpaperConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallpaperConfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallpaperConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
