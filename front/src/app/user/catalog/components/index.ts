import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { ReactiveComponentModule } from '@ngrx/component';

import { UserComponentsModule } from '../../components/index.module';
import { SharedModule } from '@shared/shared.module';
import { EditAddProductComponent } from './edit-add-product/edit-add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ReplaceCatalogComponent } from './replace-catalog/replace-catalog.component';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import { MyPipesModule } from '@shared/pipes/my-pipes.module';
import { LoaderErrorComponent } from './loader-error/loader-error.component';
import { WaitSnackbarComponent } from './wait-snackbar/wait-snackbar.component';
import { DoneSnackbarComponent } from './done-snackbar/done-snackbar.component';

type ComponentsType =
  typeof EditAddProductComponent |
  typeof DeleteProductComponent |
  typeof ReplaceCatalogComponent |
  typeof FileLoaderComponent |
  typeof LoaderErrorComponent |
  typeof WaitSnackbarComponent |
  typeof DoneSnackbarComponent;

const components : ComponentsType[] = [
  EditAddProductComponent,
  DeleteProductComponent,
  ReplaceCatalogComponent,
  FileLoaderComponent,
  LoaderErrorComponent,
  WaitSnackbarComponent,
  DoneSnackbarComponent
];

@NgModule({
  declarations: [ components ],
  imports: [
    MatDialogModule,
    UserComponentsModule,
    SharedModule,
    CommonModule,
    NgxDropzoneModule,
    MyPipesModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    ReactiveComponentModule
  ],
  exports: [ components ]
})
export class CatalogComponentsModule {}
