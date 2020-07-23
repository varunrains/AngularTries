import { Directive,OnInit, ElementRef } from '@angular/core';

@Directive({
  //This should be unique selector - Camel Case - attribute directive
  selector: '[appBasicHighlight]'
})

export class BasicHighlightDirective implements OnInit {
  //Property and Injection together 
  constructor(private elementRef: ElementRef) {
  }

  //Like components we can have life cycle hook methods in directives also
  ngOnInit(): void {
    //You should not access the DOM elements like these, it is not a good practice
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
