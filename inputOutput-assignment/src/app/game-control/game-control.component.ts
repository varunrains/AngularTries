import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  counter: number = 0;
  @Output('gameStarted') gameStartedEvent = new EventEmitter<{ startCount: number }>();
  referenceObjectForInterval: any;

  constructor() { }

  ngOnInit(): void {
  }

  onStartButtonClick() {
    this.referenceObjectForInterval = setInterval(() => {
        this.gameStartedEvent.emit({ startCount: this.counter++ });
      },
      1000);

  }

  onStopButtonClick() {
    clearInterval(this.referenceObjectForInterval);
  }


}
