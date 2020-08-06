import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userService: UsersService) {}
  isActivatedUser: boolean = false;
  firstSubscriptionObservable: Subscription;
  ngOnInit() {
   this.firstSubscriptionObservable =  this.userService.userActivated.subscribe((status: boolean ) => {
      this.isActivatedUser = status;
    });
  }

  ngOnDestroy() {
    //As this is created by rxjs and it is not from angular core
    //you must destroy this once you move out from the component
    //Or else you will introduce memory leaks be careful
    this.firstSubscriptionObservable.unsubscribe();
  }

}
