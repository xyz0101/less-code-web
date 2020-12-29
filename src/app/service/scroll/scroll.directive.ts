import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  @Output() scrollChange = new EventEmitter<number>();

  constructor(private el: ElementRef) { }

  @HostListener('scroll') onScroll() {
    console.log("onscoll")
    this.scrollChange.next(this.el.nativeElement);
  }
}
