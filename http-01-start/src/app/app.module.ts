import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LoggingInterceptorService } from './loggin-interceptor.service';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  //The below setting tells your application to run the 'intercept' method
  //You can have one or more interceptors, so to tell angular that you need to use the below
  //AuthInterceptorService even though you have multiple Interceptors use the property 'multi' which is set to 'true'.
  //If there are multiple interceptors then the order in which they are provided
  //will execute in order, here AuthInterceptorService will run first
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
