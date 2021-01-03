import { Component, OnInit } from '@angular/core';
import '@angular/compiler';
@Component({
  selector: 'app-love-typewriting',
  templateUrl: './love-typewriting.component.html',
  styleUrls: ['./love-typewriting.component.css']
})
export class LoveTypewritingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('进入：','LoveTypewritingComponent')
  }

}
