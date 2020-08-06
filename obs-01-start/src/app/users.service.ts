import { Injectable, EventEmitter } from '@angular/core';
import {Subject} from 'rxjs'

@Injectable({providedIn: 'root'})
export class UsersService {
  //userActivated = new EventEmitter<boolean>();
  userActivated = new Subject<boolean>();

  activateUser() {
    //this.userActivated.emit(true);
    this.userActivated.next(true);
  }
}
