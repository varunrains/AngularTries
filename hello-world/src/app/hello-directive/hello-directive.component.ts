import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hello-directive',
  templateUrl: './hello-directive.component.html',
  styleUrls: ['./hello-directive.component.css']
})
export class HelloDirectiveComponent implements OnInit {

  constructor() { }
  shouldParagraphDisplay: boolean = false;
  counter: number = 0;
  counterArray: Array<any> = [];
  ngOnInit() {
  }
  public toggleParagraph() {
    this.shouldParagraphDisplay = !this.shouldParagraphDisplay;
    //this.counter++;
    this.counterArray.push(new Date());
  }

  public getColor(index: number): string {
    if (index >= 5)
      return "blue";

    return "white";
  };
}
