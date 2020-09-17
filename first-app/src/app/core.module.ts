import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AuthInterceptorService } from './auth/auth-interceptor';

//Core modules will contain only services
//If you have any services laying around in the app.module you can
//segregate it.
@NgModule({
  providers: [
            ShoppingListService,
            { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }]
})
export class CoreModule { }
