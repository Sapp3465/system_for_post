import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CatalogComponents } from './catalog.components';
import { CatalogRoutingModule } from './catalog-routing.module';
import { UserComponentsModule } from '../components/index.module';
import { CatalogComponentsModule } from './components';

@NgModule({
  declarations: [
    CatalogComponents
  ],
  imports: [
    CatalogRoutingModule,
    UserComponentsModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    CatalogComponentsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    ReactiveFormsModule,
    ReactiveComponentModule,
  ],
  providers: []
})
export class CatalogModule { }
