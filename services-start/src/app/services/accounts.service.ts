import { LoggingService } from './logging.service';
import { Injectable, EventEmitter, Output } from '@angular/core';

//With this decorator you can inject any service into this service
@Injectable()
export class AccountService {

  constructor(private loggingService: LoggingService) {

  }

  accountAdded = new EventEmitter<string>();

  accounts = [
    {
      name: 'Master Account',
      status: 'active'
    },
    {
      name: 'Testaccount',
      status: 'inactive'
    },
    {
      name: 'Hidden Account',
      status: 'unknown'
    }
  ];

  addAccount( name: string, status: string) {
    this.accounts.push({ name: name, status: status });
    this.loggingService.logStatusChange(status);
    
  }

  updateAccount( id: number, newStatus: string ) {
    this.accounts[id].status = newStatus;
    this.loggingService.logStatusChange(newStatus);
  }
}
