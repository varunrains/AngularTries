import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {
   users: string[];
  // userSetToActive = new EventEmitter<number>();

  constructor(private usersService: UserService) {
    //It is good practice to initialize in the ngOnInit method and not in Constructor
    this.users = this.usersService.inactiveUsers;
  }

  onSetToActive(id: number) {
    this.usersService.onSetToActive(id);
    // this.userSetToActive.emit(id);
  }
}
