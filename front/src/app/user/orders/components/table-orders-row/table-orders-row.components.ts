import {Component, EventEmitter, Input, Output} from '@angular/core';

import { OrderData } from '../../orders.components';
import {Router} from "@angular/router";

@Component({
  selector: 'app-table-orders-row',
  templateUrl: './table-orders-row.component.html',
  styleUrls: ['./table-orders-row.component.scss']
})
export class TableOrdersRowComponents {
  @Input('data') data: OrderData;
  @Output('onActivate') onActivate: EventEmitter<OrderData> = new EventEmitter<OrderData>();
  @Output('onInactivate') onInactivate: EventEmitter<OrderData> = new EventEmitter<OrderData>();
  public isOpen: boolean = false;

  constructor(private router: Router) {
  }

  public onOpen(): void {
    this.isOpen = true;
    this.onActivate.emit(this.data);
  }

  public onClose(): void {
    this.isOpen = false;
    this.onInactivate.emit(this.data);
  }

  public printOrder(): void {
    this.router.navigate(['/printOrder', { data: JSON.stringify(this.data) }]);
  }
}
