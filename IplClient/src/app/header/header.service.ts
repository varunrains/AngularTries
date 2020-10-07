import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn:'root'})
export class HeaderService {
  closeSideNavigation = new Subject<void>();

  onClickOfBody() {
    this.closeSideNavigation.next();
  }
}
