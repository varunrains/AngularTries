import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import {tap} from 'rxjs/operators';

export class AuthInterceptorService implements HttpInterceptor {
  //intercept will run before the request goes out of the browser/application
  //hence the return is required, you should not hold the 'req' object
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    //Logging is taken care in other Inteceptor
    //console.log('Request is on its way');
    //console.log('Request URL:' + req.url);
    //We need to use the clone because original 'req' object is immutable
    const modifiedRequest = req.clone({ headers: req.headers.append('auth', '2isdfoFD-weWO234-223DSFddfsi') });
    //next method will allow the request to continue further in the chain,
    //This will allow the request to continue, otherwise your app will break as the request
    //will not go out from the application.
    //After updating the request you need to forward the modified request as below:
    //The handle is the observable, so this as a whole is your response,
    //You can add any rxjs/operators to transform the response as shown in other modules
    return next.handle(modifiedRequest).pipe(tap(event => {
      //Here we are interested in observing the events:
      //console.log(event);
      if (event.type === HttpEventType.Response) {
        //console.log('Response Arrived !!' + 'Body data below:');
        //console.log(event.body);
      }
    }));
    }
}
