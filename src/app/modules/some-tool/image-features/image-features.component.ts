import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-features',
  templateUrl: './image-features.component.html',
  styleUrls: ['./image-features.component.css']
})
export class ImageFeaturesComponent implements OnInit {
  hGutter = 16;
  vGutter = 16;
  imageFeatures = [
  {
    name:"背景替换",
    desc:"用于替换证件照的背景",
    cover:"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
    code:"background"
  } 
]


  constructor() { }

  ngOnInit(): void {

  }


  chooseFeature(code){
    console.log("功能编号："+code)
  }


}
