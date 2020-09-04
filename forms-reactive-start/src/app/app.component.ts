import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUsers: string[] = ['Cris','Anna'];
  signupForm: FormGroup;

  ngOnInit() {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.checkForForbiddenUsers.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email],this.forbiddenEmailsByAsyncValidator)
      }),
      gender: new FormControl('male'),
      hobbies:new FormArray([])
    });

    //As template driven approach you can set/patch the form values
    this.signupForm.setValue({
      userData: {
        username: 'Max',
        email:'max@max.com'
      },
      gender: 'male',
      hobbies:[]
    });

    //Patch value to update only some values of the form
    this.signupForm.patchValue({
      userData: {
        username:'Anna'
      }
    });

    //You can also subscribe for Status and Value changes in the form
    this.signupForm.valueChanges.subscribe((value) => {
      console.log(value);
    });


    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

  }

  //mimic-ing server side validation
  forbiddenEmailsByAsyncValidator(control: FormControl): Promise<any> | Observable<any> {
    var promise = new Promise<any>((resolve, reject) => {
      if (control.value === 'test@test.com') {
        setTimeout(() => {
        resolve({ isForbiddenEmail: true });
        }, 1500);
      } else {
        //we cannot return { isForbiddenEmail: false }
        resolve(null);
      }
    });
    return promise;
  }

  //In Reactive approach no need to get the form reference from HTML using "ViewChild"
  //Because in Reactive approach you are the one who has created the form object
  //So you can access it without any additional hassle
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby() {
    const newAddedControl = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(newAddedControl);
  }

  checkForForbiddenUsers(control: FormControl): {[key: string]: boolean} {
    if (this.forbiddenUsers.indexOf(control.value) !== -1) {
      return { isForBiddenUser: true };
    }
    return null;
  }

  //This method is added just in case if the *ngFor doesnot work with
  //signupForm.get('hobbies').controls
  //This is because in new Angular version accessing this is invalid
  //And you have to use below method in *ngFor to loop through
  getHobbies() {
  return  (<FormArray>this.signupForm.get('hobbies')).controls;
  }


}
