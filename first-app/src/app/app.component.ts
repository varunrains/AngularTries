import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AuthService } from './auth/auth.service';
import { LoggingService } from './logging.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showRecipeSection: boolean = true;
  showShoppingListSection: boolean;
  constructor(
    private authService: AuthService,
    private loggingService: LoggingService,
    //This is manual injection that you can use
    //One of the feature of Angular.
    @Inject(PLATFORM_ID) private platformId) { }

  ngOnInit() {

    //To check if your code is running in the browser or not.
    if (isPlatformBrowser(this.platformId)) {
      this.authService.autoLogin();
    }
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
