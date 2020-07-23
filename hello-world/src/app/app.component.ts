import { Component, OnInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges{
  title = 'hello-world';
  inputArray = ['toshow', 'sdf'];
  simpleText: string = '';
  toggleComponent: boolean = true;
  unlessDirectiveToggle: boolean = false;
  switchValue: string;
  ngOnChanges(changes: SimpleChanges): void {
    //console.log('ng on change called');
    //console.log(changes);
  }

  ngOnInit(): void {
    console.log('ngOnit called');
  }

  onButtonClickForNgChangeDemo() {
    this.simpleText = "Change randomly: " + Math.random();
  }

  onButtonClickForDoCheckDemo = () => {
   //Do nothing
   //CHeck to see if the do check works!
   //console.log('');

  }

  onButtonClickForOnDestroy = () => {
    this.toggleComponent = !this.toggleComponent;
  }

  onUnlessDirectiveClick = () => {
    this.unlessDirectiveToggle = !this.unlessDirectiveToggle;
  }

  changeEventHandler = (changedData: Event) => {
    this.switchValue = (<HTMLInputElement>changedData.srcElement).value;
  }

  constructor() {
    console.log('Constructor called');
  }
}
