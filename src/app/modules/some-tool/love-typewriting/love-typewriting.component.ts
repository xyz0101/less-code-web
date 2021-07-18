import { Component, OnInit } from '@angular/core';
import '@angular/compiler';
import { MarkdownService } from 'ngx-markdown';
@Component({
  selector: 'app-love-typewriting',
  templateUrl: './love-typewriting.component.html',
  styleUrls: ['./love-typewriting.component.css']
})
export class LoveTypewritingComponent implements OnInit {
  markdown = "123131312"
  text2 = ""
  typescriptMarkdown 
  constructor(private markdownService: MarkdownService) { }

  ngOnInit(): void {
    console.log('进入：','LoveTypewritingComponent')
    console.log(this.markdownService.compile('I am using __markdown__.'));
  }


  onReady(){
    console.log("ready")
  }
    
}
