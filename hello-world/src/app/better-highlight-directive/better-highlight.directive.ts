import {
  Directive,
  Renderer2,
  OnInit,
  ElementRef,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements  OnInit {

  @Input('appBetterHighlight') defaultColour: string;
  @Input() highlightColour: string = 'blue'
  constructor(private eleRef: ElementRef, private renderer: Renderer2) { }

  //You cannot use dashes here as you are accessing DOM object (It is like JS)
  //You can bind to any property that you are sitting on
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColour;

  //HostListener can take standard event names
  @HostListener('mouseenter') mouseEnter = (eventData: Event) => {

    //NOTHING wrong in using renderer
   // this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
    //With BINDING you have got option.
    this.backgroundColor = this.highlightColour;
  }

  @HostListener('mouseleave') mouseExit = (eventData: Event) => {

   // this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'transparent');
    this.backgroundColor = this.defaultColour;
  }

  ngOnInit(): void {
    //Why this is better because: Angular is not limited to displaying value in browser. Angular works with Service workers
    //In Service workers you don't have access to DOM. This is a better approach to select the DOM elements
   this.backgroundColor =  this.defaultColour; //Once we have our values from outside (It will wait)
    //this.renderer.setStyle(this.eleRef.nativeElement, 'background-color', 'blue');
  }


}
