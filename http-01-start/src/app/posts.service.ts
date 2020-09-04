import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams,HttpEventType } from '@angular/common/http';
import { Post } from './post.model';
import { map,catchError, tap } from 'rxjs/operators';
import {Subject,throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {

  }

  //If you want to catch the errors in the multiple components
  //Or If you are subscribing the Http calls in the Service only then you can use Subject
  error = new Subject<string>();

  createAndStorePosts(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(
        'https://angulartestingmaxmiller.firebaseio.com/addData.json', postData,
        {
          //To observe, we can pass 'response' , 'events', 'body'
          //Basically we are telling what to observe
          observe: 'response'
        })
      .subscribe(responseData => {
        console.log(responseData);
      }, (errorMessage) => {
        this.error.next(errorMessage.message);
          console.log(errorMessage);
      });
  }

  fetchPosts() {
    // you are assigning it one by one because this is immutable every call to .append will create a new HttpParam
    let collectionParams = new HttpParams();
    collectionParams = collectionParams.append('second', 'secondValue');
    collectionParams = collectionParams.append('third', 'thirdValue');
    //If you dont subscribe then there is no response as simple as that. :D
    //You are returning the Observable
    return this.http.get<{ [key: string]: Post }>('https://angulartestingmaxmiller.firebaseio.com/addData.json',
      {
        headers: new HttpHeaders({
          'my-custom-header': 'Hello Varun!!'
        }),
        //params: collectionParams
       
  })
      .pipe(map((responseData) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          //hasOwnProperty is used to check if the property exists inside the object
          if (responseData.hasOwnProperty(key)) {
            //... operator fill flatten the array similar to SelectMany in C#
            postsArray.push({ ...responseData[key], "id": key });
          }
        }
        //Finally return the array inside the map to transform your output
        return postsArray;
      }, catchError((errorResponse) => {
        //this is just optional
        //Send the error response to some servers,
        //You need to still send an observable to the subscribers.
        //Hence you need to wrap the error message in the throwError function so that it yields another Observable.
        return throwError(errorResponse);
      })));
  }

  deletePosts() {
    return this.http.delete('https://angulartestingmaxmiller.firebaseio.com/addData.json',
      {
        observe:'events'
      }).pipe(tap(event => {
        if (event.type === HttpEventType.Sent) {
          //type : 0 is the response is of this type.
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
    }));
  }
}
