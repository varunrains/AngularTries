import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
counterValue:number;

  constructor() { }

  ngOnInit(): void {
  }

  gameStarteds(input: any) {
      this.counterValue = input.startCount;
  }

}
