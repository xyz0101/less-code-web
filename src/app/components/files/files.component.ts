import { Component, OnInit } from '@angular/core';
import { AibizhiService, Category, Wallpaper } from 'src/app/service/files/aibizhi/aibizhi.service';
import { NzMarks } from 'ng-zorro-antd/slider';
import { NzImageService } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
  showImgList = false;
  constructor(private aibizhiService:AibizhiService,private nzImageService: NzImageService) { }
  categories = Category [0];
  imgList = Wallpaper[0];
  ngOnInit(): void {
    this.loadCategory()
  }
  loadCategory() {
    this.showImgList = false;
    this.aibizhiService.getCategory().subscribe(item=>{
      this.categories = item.data
      console.log("获取到分类：",this.categories)
    })
  }
 
  loadWallpaper(code,skip){
    console.log('加载图片')
    this.showImgList = true;
    this.aibizhiService.getWebImageList(code,skip).subscribe(item=>{
      this.imgList = item.data
      console.log("获取到图片：",this.imgList)
    })
  }


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




 downloadDeskImg(code){
   this.aibizhiService.downloadDeskImg(code)
 }

 showImage(data){
  const images = [
    {
      src: 'https://img.alicdn.com/tfs/TB1g.mWZAL0gK0jSZFtXXXQCXXa-200-200.svg',
      width: '200px',
      height: '200px',
      alt: 'ng-zorro'
    },
    {
      src: 'https://img.alicdn.com/tfs/TB1Z0PywTtYBeNjy1XdXXXXyVXa-186-200.svg',
      width: '200px',
      height: '200px',
      alt: 'angular'
    }
  ];
  this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
   console.log('点击图片',data)
 }
}
