import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';

import { AppRoutingComponents, AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { AuthUnloginGuard } from '@core/services/auth/auth-unlogin.guard';
import { AuthInterceptorService } from '@core/services/auth/auth-interceptor.service';
import { LoadingInterceptorService } from '@core/services/loading/loading-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    AppRoutingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    AuthUnloginGuard,
    MatSnackBar,
    Overlay,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true }
    ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
