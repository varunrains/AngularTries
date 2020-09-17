import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropDownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { LoggingService } from '../logging.service';

@NgModule({
  declarations: [
    DropDownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  //Here the exporting of the shared resources is necessary as these components are directives or pipes
  //may not be used in the Routing compnonet and also there is no routing for the shared module
  //designed here. Hence we need to export these
  exports: [
    DropDownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule
  ],
  //This depends on the the angular version, for angular > 9 then
  //you can omit the below usage of entryComponents
  entryComponents: [AlertComponent],
  providers: [LoggingService]
})
export class SharedModule { }
