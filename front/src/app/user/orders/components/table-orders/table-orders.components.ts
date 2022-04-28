import {Component, EventEmitter, Input, Output} from '@angular/core';
import {OrderData} from "../../orders.components";

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.scss']
})
export class TableOrdersComponents {
  @Input('data') data: OrderData[] = [];
  @Output('onChooseActive') onChooseActive: EventEmitter<OrderData> = new EventEmitter<OrderData>();
  @Output('onRemoveActive') onRemoveActive: EventEmitter<OrderData> = new EventEmitter<OrderData>();

  public chooseOrder(data : OrderData): void {
    this.onChooseActive.emit(data);
  }

  public removeOrder(data : OrderData): void {
    this.onRemoveActive.emit(data);
  }
}
