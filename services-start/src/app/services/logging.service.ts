//DRY - Dont repeat yourself - With service you can achieve this
export class LoggingService {
  logStatusChange(newStatus: string) {
    console.log('A server status changed, new status: ' + newStatus);
  }
}
