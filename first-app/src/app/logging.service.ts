import { Injectable } from '@angular/core';

//This is just a service to understand the concept on how
//the services are loaded in different scenarios like
//Eager loading, lazy loading etc. (Different stages of services
//initialization)
//@Injectable({ providedIn:'root' })
export class LoggingService {
  lastLog: string;

  printLog(message: string) {
    console.log(message);
    console.log("This is LastLog :"+this.lastLog);
    this.lastLog = message;
  }
}
