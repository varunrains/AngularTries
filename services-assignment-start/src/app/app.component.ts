import { Component } from '@angular/core';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeClicks;
  inActiveClicks;
  constructor(private counterService: CounterService) {
    this.counterService.onClickHandler.subscribe((data) => {
      if (data.type === 'active') {
        this.activeClicks = data.numberOfClicks;
      } else {
        this.inActiveClicks = data.numberOfClicks;
      }
    });
  }
}
