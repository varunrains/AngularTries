import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  //ViewContainerRef will be a pointer or a placeholder
  //so that any data can display here if it is present in the DOM
  constructor(public viewContainerRef: ViewContainerRef) {

  }

}
