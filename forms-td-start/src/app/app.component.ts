import { Component,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})  
export class AppComponent {
  @ViewChild('f', { static: false }) signupForm: NgForm;
  defaultQuestion: string = 'pet';
  answer:string='';
  genders: Array<string> = ['male', 'female'];
  subscriptions: Array<string> = ['Basic', 'Advanced', 'Pro'];
  defaultSubscription:string ='Advanced';
  submitted: boolean = false;
  user = {
    username: '',
    email: '',
    question: '',
    answer: '',
    gender:''
  };

  userPractise = {
    email: '',
    password: '',
    subscription:''
  };

  suggestUserName() {
    const suggestedName = 'Superuser';

    //This approach will over-write all the values of the form
    //You need to specify all the form controls and you should set the values of each
    //Even if you miss one control inside the form, then you will get the error.
    //this.signupForm.setValue({ userData: {
    //  username: suggestedName,
    //  email:''
    //},
    //  secret: 'pet',
    //  questionAnswer: '',
    //  gender:''
    //});
    //Alternative and better approach to avoid over-writing of form values
    //Even if you dont specify other form control data, this will work without any errors.
    this.signupForm.form.patchValue({
      userData: {
        username:suggestedName
      }
    });
  }

  //onSubmit(form: NgForm) {
  //  console.log(form);
  //}

  //Alternative approach using @ViewChild
  onSubmit() {
   // console.log(this.signupForm);
    this.submitted = true;
    //this.user.username = this.signupForm.value.userData.username;
    //this.user.email = this.signupForm.value.userData.email;
    //this.user.question = this.signupForm.value.secret;
    //this.user.answer = this.signupForm.value.questionAnswer;
    //this.user.gender = this.signupForm.value.gender;

    this.userPractise.email = this.signupForm.value.email;
    this.userPractise.password = this.signupForm.value.password;
    this.userPractise.subscription = this.signupForm.value.subscription;


    this.signupForm.reset();
  }
}
