import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WarningComponent } from './warningComponent/warning.component';
import { SuccessComponentComponent } from './success-component/success-component.component';
import { TwoWayBindingComponent } from './two-way-binding/two-way-binding.component';
import { HelloDirectiveComponent } from './hello-directive/hello-directive.component';

@NgModule({
  declarations: [
    AppComponent,
    WarningComponent,
    SuccessComponentComponent,
    TwoWayBindingComponent,
    HelloDirectiveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
