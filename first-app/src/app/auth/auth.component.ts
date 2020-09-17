import { Component, OnInit, ComponentFactoryResolver, ViewChild, OnDestroy} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  //The first occurence of the directive in the DOM
  @ViewChild(PlaceholderDirective, { static: true }) alertHost: PlaceholderDirective;
  closeHandlerSubscription: Subscription;
  error = null;
  //You can save some lines of code
  authObservable: Observable<AuthResponseData>;
  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.authObservable = this.authService.login(email, password);
    } else {
      this.authObservable = this.authService.signUp(email, password);
    }
    this.authObservable.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });


    console.log(form.value);
    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    //The below code will not work :) Angular does not instantiate
    //the component like shown below:
    //const alertCmp = new AlertComponent();

    //The below object knows how to create a Alert component
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = message;
    this.closeHandlerSubscription = componentRef.instance.close.subscribe(() => {
      this.closeHandlerSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeHandlerSubscription) {
      this.closeHandlerSubscription.unsubscribe();
    }
  }

}
