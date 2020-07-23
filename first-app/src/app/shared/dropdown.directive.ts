import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  'selector': '[dropDown]'
})

export class DropDownDirective {

  @HostBinding('style.backgroundColor') changeColor = 'yellow';

  //You can also do this by using HostBinding which is even simpler in approach
  @HostListener('click') clickEvent = () => {

    if (this.elementRef.nativeElement.className.search("open") === -1) {
      this.changeColor = 'red';
      this.elementRef.nativeElement.classList.add("open");
      
    } else {
      this.elementRef.nativeElement.classList.remove("open");
      this.changeColor = 'blue';
    }
  };


  constructor(private elementRef: ElementRef) {

  }


//  Closing the Dropdown From Anywhere
//  If you want that a dropdown can also be closed by a click anywhere outside(which also means that a click on one dropdown closes any other one, btw.), replace the code of dropdown.directive.ts by this one(placing the listener not on the dropdown, but on the document):

//  import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

//@Directive({
//  selector: '[appDropdown]'
//})
//export class DropdownDirective {
//  @HostBinding('class.open') isOpen = false;
//  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
//    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
//  }
//  constructor(private elRef: ElementRef) { }
//}

}
