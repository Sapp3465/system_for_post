import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

//import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { SortService } from '@core/services/sort/sort.service';
import { DaysType } from'@shared/components';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CustomersState } from '@core/reducers/customers/customers.reducers';
import { selectCustomers, selectCustomersSize } from '@core/reducers/customers/customers.selector';
import { GetCustomersAction, GetCustomersLikeAction } from '@core/reducers/customers/customers.actions';

export interface DataTableCustomers {
  id?: number,
  no: string,
  name: string,
  address: string,
  deliveryDays: DaysType
}

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss', '../styles/common_page.components.scss']
})
export class CustomersComponents implements OnInit, OnDestroy{
  public val:string = '';
  public howManyLoad: number = 5;
  public customersCount$: Observable<number> = this.userStorage.pipe(select(selectCustomersSize));
  public visibleColumns: string[] = ['no', 'name', 'address', 'deliveryDays'];
  public dataTable: DataTableCustomers[] = []
  private dataObserver: Subscription = this.userStorage.pipe(select( selectCustomers )).subscribe((data: DataTableCustomers[]) => {
      this.dataTable = data;
      this.sortedData = data;
  })

  public sortedData: DataTableCustomers[];
  private loadType: 'simple' | 'like' = 'simple';

  constructor(private dialog: MatDialog, private sorter: SortService, private userStorage: Store<CustomersState>) {
  }

  public set value(template: string) {
    if(!(template.indexOf('/') + 1)){ //!!!
      if(template !== ''){
        this.loadType = 'like';
        this.userStorage.dispatch(new GetCustomersLikeAction({ start: 0, howMany: this.howManyLoad, template }))
      }
      else {
        this.loadType = 'simple';
        this.userStorage.dispatch(new GetCustomersAction({ start: 0, howMany: this.howManyLoad }))
      }
      this.val = template;
    }
  }

  public sortData(sort: Sort): void {
    const data = this.dataTable.slice();
    if (this.sorter.isDirectionEmpty(sort)) this.sortedData = data;
    else this.sortedData = data.sort(this.sorter.sortData(sort));
  }

  public ngOnInit(): void {
    this.sortedData = this.dataTable.slice();
    this.userStorage.dispatch(new GetCustomersAction({ start: 0, howMany: this.howManyLoad }))
  }

  public ngOnDestroy(): void {
    this.dataObserver.unsubscribe();
  }

  public changeHowManyLoad(count: number): void {
    this.howManyLoad = count
    if(this.loadType === 'like')
      this.userStorage.dispatch(new GetCustomersLikeAction({ start: 0, howMany: count, template: this.val }))
    if(this.loadType === 'simple')
      this.userStorage.dispatch(new GetCustomersAction({ start: 0, howMany: count }))
  }

  public loadPageData(startWith: number): void {
    if(this.loadType === 'like')
      this.userStorage.dispatch(new GetCustomersLikeAction({ start: startWith, howMany: this.howManyLoad, template: this.val }))
    if(this.loadType === 'simple')
      this.userStorage.dispatch(new GetCustomersAction({ start: startWith, howMany: this.howManyLoad }))
  }

  public dialogEdit(event: DataTableCustomers): void {
    this.dialog.open(EditCustomerComponent, {
      data: event
    })
  }

  // public addCustomer():void {
  //   this.dialog.open(AddCustomerComponent)
  // }

}
