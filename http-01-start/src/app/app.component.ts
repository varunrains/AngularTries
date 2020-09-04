import { Component, OnInit , OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import {Subscription} from 'rxjs'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts = [];
  errorSubscription:Subscription;
  isLoading: boolean = false;
  error = null;
  constructor(private http: HttpClient, private postService: PostsService) { }
  ngOnInit() {
   this.errorSubscription = this.postService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
    this.fetchAddedItems();
  }
  //Without .subscribe the below POST request will never get fired.
  //Because Angular thinks that there is no use of the data and hence it will not make a network call
  //To send the request you must subscirbe (observable) and then it completes the request
  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postService.createAndStorePosts(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchAddedItems();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe((deleteResponse) => {
      //If the control comes inside this call back then
      //That means that the delete was successfull and you can
      //run through your logic here
      console.log(deleteResponse);
      this.loadedPosts = [];
    });
  }

  //This is called in OnInit() and in FetchPosts method
  private fetchAddedItems() {
    this.fetchTheObservableDataFromService();
  }

  private fetchTheObservableDataFromService() {
    this.isLoading = true;
    //Only when you subscribe the actual request goes out from browser
    //fetchPosts returns Observable<Post[]>
    this.postService.fetchPosts().subscribe((responseData) => {
        this.isLoading = false;
      this.loadedPosts = responseData;
    }, (errorMessage) => {
      this.isLoading = false;
        this.error = errorMessage.message;
        console.log(errorMessage);
    });
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}
