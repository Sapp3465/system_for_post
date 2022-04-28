import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from "@ngrx/store";

import { SortService } from '@core/services/sort/sort.service';
import { LoadFromLocalstorageAction } from "@core/reducers/auth/auth.actions";
import { AuthState } from "@core/reducers/auth/auth.reducers";
import { selectStatusAuth } from "@core/reducers/auth/auth.selectors";
import { EditOrderComponent } from "./components/edit-order/edit-order.component";
import { AdminAddOrderComponent } from "./components/admin-add-order/admin-add-order.component";
import { CustomerAddOrderComponent } from "./components/customer-add-order/customer-add-order.component";

export interface Product {
  code: string
  name?: string
  unit: string
  quantity: number
  goodId?: number
}

export interface OrderData {
  orderNo: string,
  customer: string,
  customerNo: string,
  items: number,
  notes: string,
  ordered: string,
  reqDelivery: string,
  status: string,
  address?: string
  products: Product[]
}

@Component({
  selector: 'app-root',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss', '../styles/common_page.components.scss']
})
export class OrdersComponents implements OnInit, OnDestroy {
  public val: string = '';
  public status: string;
  private status$ = this.authStorage.pipe(select(selectStatusAuth))
    .subscribe((data: string) => {
    this.status = data;
  });
  public howManyLoad: number = 5;
  public customersCount: number;
  public activeData: OrderData[] = [];
  public dataTable: OrderData[] = [
    {
      orderNo: '35322',
      customer: 'Burger Bar',
      customerNo: 'BB-243',
      items: 4,
      notes: '+1 Bottle Coca Cola Please, Need to be delivered Today!',
      ordered: '3 Feb 2021, 22:34',
      reqDelivery: 'Thu, 4 Feb 2021',
      status: 'Confirmed',
      address: 'Main Street 23, 1453 Zurich',
      products: [{
        code: 'APP123',
        goodId: 1,
        name: 'Apples',
        quantity: 14,
        unit: 'kg'
      },{
        code: 'TOM53',
        goodId: 2,
        name: 'Tomatos',
        quantity: 4,
        unit: 'box'
      },{
        code: 'CUC997',
        goodId: 3,
        name: 'Cucumbers',
        quantity: 35,
        unit: 'pcs'
      },{
        code: 'PIN112',
        goodId: 4,
        name: 'Pinaple',
        quantity: 3,
        unit: 'pcs'
      }]
    },
    {
      orderNo: 'some order no 2',
      customer: 'some customer',
      customerNo: 'some cust no',
      items: 12,
      notes: 'some notes',
      ordered: 'some ordered',
      reqDelivery: 'mon, sut, fri',
      status: 'confirm',
      address: 'dkdk',
      products: []
    }
  ]
  public sortedData: OrderData[];

  constructor(private dialog: MatDialog, private sorter: SortService, private authStorage: Store<AuthState>) {
  }

  public set value(template: string) {
    //TODO get for template
    this.val = template;
  }

  public ngOnInit(): void {
    this.authStorage.dispatch(new LoadFromLocalstorageAction())
    this.sortedData = this.dataTable.slice();
    //TODO to load customers
    this.customersCount = 0;
  }

  public ngOnDestroy(): void {
    this.status$.unsubscribe();
  }

  public changeHowManyLoad(count: number): void {
    this.howManyLoad = count
  }

  public loadPageData(startWith: number): void {
    //TODO to load customers
  }

  public showAll(event: OrderData): void {

  }

  public onChooseData(data: OrderData): void {
    this.activeData.unshift(data);
  }

  public onRemoveData(data: OrderData): void {
    this.activeData = this.activeData.filter((obj : OrderData) => obj.orderNo !== data.orderNo)
  }

  public editDialog(): void {
    this.dialog.open(EditOrderComponent, { data: this.activeData[0] })
  }

  public addDialog(): void {
    this.dialog.open(AdminAddOrderComponent)
    // if(this.status === 'admin')
    //   this.dialog.open(AdminAddOrderComponent)
    // if(this.status === 'customer')
    //   this.dialog.open(CustomerAddOrderComponent)
  }
}
