import { Component, OnInit } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMarks } from 'ng-zorro-antd/slider';
import { AibizhiService, Category, Wallpaper } from 'src/app/service/files/aibizhi/aibizhi.service';
import { RouteUtils } from 'src/app/util/RouteUtils';

@Component({
  selector: 'app-wallpaper-category',
  templateUrl: './wallpaper-category.component.html',
  styleUrls: ['./wallpaper-category.component.css']
})
export class WallpaperCategoryComponent implements OnInit {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
  loading = false;
  hGutter = 16;
  vGutter = 16;
  showImgList = false;
  constructor(private aibizhiService: AibizhiService, private nzImageService: NzImageService,private router:RouteUtils) { this.showImgList = false;}
  categories = Category[0];
  ngOnInit(): void {
    // this.router.getRouteParams().subscribe(item=>{
      this.loadCategory()
    // })
    
  }
  loadCategory() {
    this.loading = true;
    this.showImgList = false;
    this.aibizhiService.getCategory().subscribe(item => {
      this.categories = item.data
      console.log("获取到分类：", this.categories)
      this.loading = false;
    })
  }
  goWallpaper(code,skip){
    this.showImgList = true;
      this.router.route("/nav/wpManage/category/wallpaper",{category:code,skip:skip})
  }
}
