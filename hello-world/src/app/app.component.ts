import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

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

  constructor() {
    console.log('Constructor called');
  }
}
