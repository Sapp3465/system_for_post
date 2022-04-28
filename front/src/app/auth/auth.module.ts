import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthRoutingComponents, UserRoutingModule } from './auth-routing.module';
import { AuthComponents } from './auth.components';
import { SharedModule } from '@shared/shared.module';
import { AuthComponentsModule } from './components/index.module';
import { MyPipesModule } from '@shared/pipes/my-pipes.module';


@NgModule({
    declarations: [
        AuthComponents,
        AuthRoutingComponents
    ],
    imports: [
      UserRoutingModule,
      MatIconModule,
      FormsModule,
      CommonModule,
      SharedModule,
      AuthComponentsModule,
      ReactiveFormsModule,
      ReactiveComponentModule,
      MyPipesModule,
      MatStepperModule,
      MatProgressSpinnerModule
    ],
    providers: []
})
export class AuthModule { }
