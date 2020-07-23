import { EventEmitter } from '@angular/core';

export class CounterService {
  numberOfActiveClicks: number = 0;
  numberOfInactiveClicks: number = 0;
  onClickHandler = new EventEmitter < {numberOfClicks: number,type: string}>();

  onLinkClick(statusType: string) {
    if (statusType === 'active') {
      this.numberOfActiveClicks++;
      this.onClickHandler.emit({ numberOfClicks: this.numberOfActiveClicks, type:statusType });
    } else {
      this.numberOfInactiveClicks++;
      this.onClickHandler.emit({ numberOfClicks: this.numberOfInactiveClicks, type: statusType });
    }
  }
}
