import { Component, OnInit } from '@angular/core';
import { AibizhiService, Category } from 'src/app/service/files/aibizhi/aibizhi.service';
import { NzMarks } from 'ng-zorro-antd/slider';

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
  constructor(private aibizhiService:AibizhiService) { }
  categories = Category [0];
  ngOnInit(): void {
    this.loadCategory()
  }
  loadCategory() {
    this.aibizhiService.getCategory().subscribe(item=>{
      this.categories = item.data
      console.log("获取到分类：",this.categories)
    })
  }

 getCover(data){
   return "  <img alt=\"example\"  [src]=\""+data.cover+"\" />  "
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
}
