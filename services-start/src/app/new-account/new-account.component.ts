import { Component, } from '@angular/core';
import { LoggingService } from "../services/logging.service";
import { AccountService } from "../services/accounts.service";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  providers: [LoggingService]
})
export class NewAccountComponent {
  
  constructor(private loggingService: LoggingService, private accountService: AccountService) {

    this.accountService.accountAdded.subscribe((updatedStatus: string) => {
      alert("New status is :" + updatedStatus);
    });

  }
  
  onCreateAccount(name: string, status: string) {
    this.accountService.addAccount(name,status);
    
}
    //console.log('A server status changed, new status: ' + accountStatus);
  }

