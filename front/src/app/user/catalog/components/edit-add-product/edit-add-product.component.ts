import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import { select, Store } from '@ngrx/store';

import { DataTableProducts, DialogData } from '../../catalog.components';
import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { CatalogState } from '@core/reducers/catalog/catalog.reducers';
import {
  selectCatalogAllCustomersNo,
  selectCatalogAllProductsCode,
  selectCatalogEditError
} from '@core/reducers/catalog/catalog.selector';
import {
  AddProductAction,
  EditProductAction,
  GetAllCustomerNoAction, GetAllProductsCodeAction
} from '@core/reducers/catalog/catalog.actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-add-product.component.html',
    styleUrls: [ './edit-add-product.component.scss', '../../../styles/common_dialog.components.scss' ]
})
export class EditAddProductComponent implements OnInit, OnDestroy{
  public serverMessage$: Subscription = this.catalogStorage.pipe(select(selectCatalogEditError)).subscribe((data: string) => {
    if(this.sendToServer){
      this.sendToServer = false;
      if(!data.trim()) this.openSnackbar();
    }
    if(data.trim()) this.serverError = data;
  })

  public allCustomersNo$: Observable<string[]> = this.catalogStorage.pipe(select(selectCatalogAllCustomersNo))
  public allProductsCode$: Observable<string[]> = this.catalogStorage.pipe(select(selectCatalogAllProductsCode))

  public serverError: string = '';
  private sendToServer: boolean = false
  public productForm: FormGroup;
  public exclusively: string[] = [];
  public replacement: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<EditAddProductComponent>,
    private snackbarService: SnackbarService,
    private fb: FormBuilder,
    private catalogStorage: Store<CatalogState>
  ) {
  }

  public ngOnInit(): void {
    this.catalogStorage.dispatch(new GetAllCustomerNoAction());
    this.catalogStorage.dispatch(new GetAllProductsCodeAction());
    const isTypeEdit: boolean = this.data.type === 'edit';
    const units = [];
    if(isTypeEdit)
      for(let i = 0; i < this.data?.data.units.length; i++){
        units.push(this.fb.group({
          unit: [this.data?.data.units[i].unit, [Validators.required]], price: [this.data?.data.units[i].price, [Validators.required]]
        }))
      }
    else units.push(this.fb.group({
      unit: ['', [Validators.required]], price: ['', [Validators.required]]
    }))

    this.productForm = this.fb.group({
      code: [isTypeEdit ? this.data?.data.code: '', [Validators.required, Validators.maxLength(20)]],
      name: [isTypeEdit ? this.data?.data.name: '', [Validators.required, Validators.maxLength(100)]],
      units: this.fb.array(units),
      availability: [isTypeEdit ? this.data?.data.availability: '', [Validators.required]],
    })
  }

  public ngOnDestroy(): void {
    this.serverMessage$.unsubscribe();
  }

  public get units(): FormArray {
    return this.productForm.get('units') as FormArray;
  }

  public get codeError(): string {
    const code: AbstractControl | null = this.productForm.get('code');
    let error = '';
    if(code?.touched){
      if(code?.errors?.required) error += 'This field can not be empty';
      if(code?.errors?.maxlength) error += 'This field is very long';
    }
    return error;
  }

  public get nameError(): string {
    const name: AbstractControl | null = this.productForm.get('name');
    let error = '';
    if(name?.touched){
      if(name?.errors?.required) error += 'This field can not be empty';
      if(name?.errors?.maxlength) error += 'This field is very long';
    }
    return error;
  }

  public get availabilityError(): string {
    const availability: AbstractControl | null = this.productForm.get('availability');
    let error = '';
    if(availability?.touched){
      if(availability?.errors?.required) error += 'This field can not be empty'
    }
    return error;
  }

  public get getUnitError(): (i: number) => string {
    return (i: number) => {
      const unit = this.units.controls[i].get('unit');
      let error = '';
      if(unit?.touched){
        if(unit?.errors?.required) error += 'This field can not be empty'
      }
      return error;
    }
  }

  public get getPriceError(): (i: number) => string {
    return (i: number) => {
      const unit = this.units.controls[i].get('price');
      let error = '';
      if(unit?.touched){
        if(unit?.errors?.required) error += 'This field can not be empty'
      }
      return error;
    }
  }

  public get getFilteredArr(): (all: string[], some?: string[]) => string[] {
    return (all: string[], some?: string[]) =>
      all.filter((element: string) => !some || some.indexOf(element) < 0);
  }


  public addUnit(): void {
    this.units.push(this.fb.group({ unit: ['', [Validators.required]], price: ['', [Validators.required]] }));
  }

  public deleteUnit(i: number): void {
    this.units.removeAt(i);
  }

  private openSnackbar(): void {
    this.dialogRef.close();
    if(this.data.type === 'add') this.snackbarService.open(
      'done',
      'Product Add',
      'Product was added successfully'
    )

    else this.snackbarService.open(
      'done',
      'Product Update',
      'Product was updated successfully'
    )
  }

  public setExclusively(event: string[]): void{
    this.exclusively = event;
  }

  public setReplacement(event: string[]): void{
    this.replacement = event;
  }

  private get productData(): DataTableProducts {
    return {
      id: this.data?.data?.id,
      ...this.productForm.value,
      exclusive: this.exclusively,
      replacement: this.replacement }
  }

  public addCatalog(): void {
    this.sendToServer = true;
    this.catalogStorage.dispatch(new AddProductAction(this.productData));
  }

  public editCatalog(): void {
    this.sendToServer = true;
    this.catalogStorage.dispatch(new EditProductAction(this.productData));
  }
}
