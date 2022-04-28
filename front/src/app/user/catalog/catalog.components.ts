import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { EditAddProductComponent } from './components/edit-add-product/edit-add-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { ReplaceCatalogComponent } from './components/replace-catalog/replace-catalog.component';
import { AuthState, StatusType } from '@core/reducers/auth/auth.reducers';
import { selectStatusAuth } from '@core/reducers/auth/auth.selectors';
import { CatalogState } from '@core/reducers/catalog/catalog.reducers';
import { GetProductsAction, GetProductsLikeAction, SortAvailabilityAction } from '@core/reducers/catalog/catalog.actions';
import {selectCatalogReplaceError, selectCatalogSize, selectProducts} from '@core/reducers/catalog/catalog.selector';
import { LoadFromLocalstorageAction } from '@core/reducers/auth/auth.actions';

export interface AvailabilityType {
  inStock?: boolean,
  outOfStock?: boolean,
  discontinued?: boolean
}

export interface UnitType {
  unit: string,
  price: string
}

export interface DataTableProducts {
  id ?: number,
  code: string,
  name: string,
  units: UnitType[],
  availability: AvailabilityType,
  exclusive: string[],
  replacement: string[]
}

export interface DialogData {
  type: string,
  data: DataTableProducts
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss', '../styles/common_page.components.scss']
})
export class CatalogComponents implements OnInit, OnDestroy{

  private dataSubscriber: Subscription;

  public productsCount$: Observable<number> = this.catalogStorage.pipe(select(selectCatalogSize));

  private status$: Subscription;
  private replaceError: Subscription;

  public val:string = '';
  public howManyLoad: number = 5;
  public activeAvailabilityFilter: boolean = false;
  public visibleColumns: string[] = ['code', 'name', 'unit', 'price', 'availability'];
  public dataTable: DataTableProducts[] = [];
  public sortedData: DataTableProducts[];
  private loadType: 'simple' | 'like' | 'availability' = 'simple';
  public userStatus: StatusType = 'customer';
  public availabilityForm = this.fb.group({
    inStock: [false],
    outOfStock: [false],
    discontinued: [false]
  })

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authStorage: Store<AuthState>,
    private catalogStorage: Store<CatalogState>) {
  }

  public ngOnInit(): void {
    this.sortedData = this.dataTable.slice();
    this.catalogStorage.dispatch(new GetProductsAction({ start: 0, howMany: this.howManyLoad }))
    this.authStorage.dispatch(new LoadFromLocalstorageAction())
    this.status$ = this.authStorage.pipe(select(selectStatusAuth)).subscribe((status: StatusType) => {
      if(status === 'admin') this.visibleColumns.push('actions');
      this.userStatus = status;
    })
    this.replaceError = this.catalogStorage.pipe(select(selectCatalogReplaceError)).subscribe((data: string) => {
      if(!data.trim() && data !== '') this.load();
    })
    this.dataSubscriber = this.catalogStorage.pipe(select(selectProducts)).subscribe((data: DataTableProducts[]) => {
      this.dataTable = data;
      this.sortedData = data;
    })
  }

  public ngOnDestroy(): void {
    this.status$.unsubscribe();
    this.dataSubscriber.unsubscribe();
    this.replaceError.unsubscribe();
  }

  public set value(template: string) {
    if(!(template.indexOf('/') + 1)){ //!!!
      if(this.activeAvailability) this.loadType = 'availability';
      else if(template !== '') this.loadType = 'like';
      else this.loadType = 'simple';
      this.val = template;
      this.load();
    }
  }

  public get inStock(): AbstractControl | null {
    return this.availabilityForm.get('inStock');
  }

  public get outOfStock(): AbstractControl | null {
    return this.availabilityForm.get('outOfStock');
  }

  public get discontinued(): AbstractControl | null {
    return this.availabilityForm.get('discontinued');
  }

  public get activeAvailability(): boolean {
    return this.inStock?.value || this.outOfStock?.value || this.discontinued?.value;
  }

  private load(start: number = 0): void {
    if(this.loadType === 'availability')
      this.catalogStorage.dispatch(new SortAvailabilityAction({ data: this.availabilityForm.value, start, howMany: this.howManyLoad, template: this.val }))
    if(this.loadType === 'simple')
      this.catalogStorage.dispatch(new GetProductsAction({ start, howMany: this.howManyLoad }))
    if(this.loadType === 'like')
      this.catalogStorage.dispatch(new GetProductsLikeAction({ start, howMany: this.howManyLoad, template: this.val }))
  }

  public changeHowManyLoad(count: number): void {
    this.howManyLoad = count
    this.load();
  }

  public loadPageData(startWith: number): void {
    this.load(startWith);
  }

  public replaceCatalog(): void {
    this.dialog.open(ReplaceCatalogComponent)
  }

  public addProduct(): void {
    if(this.userStatus === 'admin')
      this.dialog.open(EditAddProductComponent, {
        data: {
          type: 'add',
        }
      })
  }

  public dialogEdit(row: DataTableProducts): void {
    if(this.userStatus === 'admin')
      this.dialog.open(EditAddProductComponent, {
        data: {
          type: 'edit',
          data: row
        }
      })
  }

  public deleteProduct(row: DataTableProducts): void {
    if(this.userStatus === 'admin')
      this.dialog.open(DeleteProductComponent, { data: row })
  }

  public sortByAvailability(): void {
    this.activeAvailabilityFilter = false;
      this.value = this.val;
  }

}
