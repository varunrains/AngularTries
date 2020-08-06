import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  id: number;
  customIntervalObservableSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      //setInterval is never ending observable. You need to end by manual intervention as follows.
      //HttpRequest in other case would be Observable which can be complete once the request is processed.
      setInterval(() => {

          if (count === 6)
            observer.complete();

        if (count > 3) {
        //  observer.error(new Error("Count is greater than 3!"));
        }
          observer.next(count);
          count++;
        },
        1000);
    });

    //Middle man, here data is nothing but your subscribed data,
    //But the below line of codes will not work, as you need to chain it with subscription
      //customIntervalObservable.pipe((data: number) => {
      //  console.log("Round: " + (data + 1));
      //});

    this.customIntervalObservableSubscription = customIntervalObservable
      .pipe(
           filter(data => { return data > 0; })
          ,map((data: number) => {
          return "Round: " + (data + 1);
          })
    )
      .subscribe((data) => {
      console.log(data);
    },
      //Errors will be handled here
      (error) => {
        console.log(error);
        alert(error.message);
      },
      //Completion call back will be handled here
      //This will only be executed only when the observable is complete and not when the observable
      //throws the error
      () => {
        console.log("The observable is done working! COMPLETED");
      }
      );
  }

  ngOnDestroy(): void {
  //  this.intervalRef.unsubscribe();
    this.customIntervalObservableSubscription.unsubscribe();
  }


}
