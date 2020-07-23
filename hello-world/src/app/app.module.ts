import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WarningComponent } from './warningComponent/warning.component';
import { SuccessComponentComponent } from './success-component/success-component.component';
import { TwoWayBindingComponent } from './two-way-binding/two-way-binding.component';
import { HelloDirectiveComponent } from './hello-directive/hello-directive.component';
import { BasicHighlightDirective } from './basic-higlight-directive/basic-higlight.directive';
import { BetterHighlightDirective } from './better-highlight-directive/better-highlight.directive';
import { UnlessDirective } from './unless-directive/unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    WarningComponent,
    SuccessComponentComponent,
    TwoWayBindingComponent,
    HelloDirectiveComponent,
    BasicHighlightDirective,
    BetterHighlightDirective,
    UnlessDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
