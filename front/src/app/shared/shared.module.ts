import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import * as fromComponents from './components';

@NgModule({
  declarations: [...fromComponents.components],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    ReactiveComponentModule,
    MatCheckboxModule,
    MatChipsModule,
    MatOptionModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [...fromComponents.components, MatIconModule]
})
export class SharedModule {}
