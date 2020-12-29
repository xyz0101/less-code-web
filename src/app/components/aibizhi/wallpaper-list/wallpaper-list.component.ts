import { Component, OnInit } from '@angular/core';
import { NzImageService } from 'ng-zorro-antd/image';
import { NzMarks } from 'ng-zorro-antd/slider';
import { AibizhiService, Wallpaper } from 'src/app/service/files/aibizhi/aibizhi.service';
import { RouteUtils } from 'src/app/util/RouteUtils';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-wallpaper-list',
  templateUrl: './wallpaper-list.component.html',
  styleUrls: ['./wallpaper-list.component.css']
})
export class WallpaperListComponent implements OnInit {

 tabIndex = 0;
  colors = ['magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]
loading = false;
 
subscribeScoll: any;
  columnTop: string;
  
constructor(private aibizhiService: AibizhiService, private nzImageService: NzImageService,private route:RouteUtils) { }
category 
imgList = Wallpaper[0];
pageIndex = 0;
  ngOnInit(): void {
    this.subscribeScoll = fromEvent(window, 'scroll')
    // .debounceTime(50) // 防抖
   .subscribe((event) => {
   this.onWindowScroll(event);
   }); 
    this.route.getRouteParams().subscribe(item=>{
        let category=item.category
        this.category = category;
        let skip = item.skip?item.skip: this.pageIndex;
        console.log("加载壁纸：",category,skip)
        if(category&&skip)
        this.loadWallpaper(category,skip)
    })
  }
  ngOnDestroy() {
    this.subscribeScoll.unsubscribe();
  }
  loadWallpaper(code, skip) {
     this.loading=true;
    console.log('加载图片')
  
    if(this.tabIndex==0){
      this.aibizhiService.getWebImageList(code, skip).subscribe(item => {
        this.imgList = item.data
        console.log("获取到图片：", this.imgList)
        this.loading=false;
      })
    }else{
      this.aibizhiService.getImageList(code, skip).subscribe(item => {
        this.imgList = item.data
        console.log("获取到图片：", this.imgList)
        this.loading=false;
      })
    }
    
  }
  scrollTop=0

  hGutter = 16;
  vGutter = 16;
  count = 4;
  array = new Array(this.count);
  marksHGutter: NzMarks = {
    '8': '8',
    '16': '16',
    '24': '24',
    '32': '32',
    '40': '40',
    '48': '48'
  };
  marksVGutter: NzMarks = {
    '8': '8',
    '16': '16',
    '24': '24',
    '32': '32',
    '40': '40',
    '48': '48'
  };
  marksCount: NzMarks = {
    '2': '2',
    '3': '3',
    '4': '4',
    '6': '6',
    '8': '8',
    '12': '12'
  };
  reGenerateArray(count: number): void {
    this.array = new Array(count);
  }


  getColor():string{
 
    let index =Math.round(Math.random() *  this.colors.length);
    if(this.colors.length<=index){
      return this.colors[index-1];
    }
    return this.colors[index]
  }

  downloadDeskImg(code) {
    this.aibizhiService.downloadDeskImg(code)
  }

  showImage(data) {
    const images = [
      {
        src: data.wp,

      }
    ];
    this.nzImageService.preview(images);
    console.log('点击图片', data)
  }

  onSelectTable(data){
      console.log(data)
      this.tabIndex = data.index
      this.loadWallpaper(this.category,0)
  }
  onScrollChange(el: Element) {
    this.scrollTop = el.scrollTop;
    console.log("滚动：",this.scrollTop)
  }

  
  onWindowScroll(event) {
    // let top = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)  ;
    // var box = document.getElementById("box")
    // if(top>=800){
    //   this.loading=true;
    //   this.aibizhiService.getWebImageList(this.category, 20).subscribe(item => {
    //     this.imgList = item.data
    //     console.log("获取到图片：", this.imgList)
    //     this.loading=false;
    //   })
       
    // }
    // console.log( window.getComputedStyle(box).height,top);
   }
    
}
