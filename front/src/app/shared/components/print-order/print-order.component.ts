import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
//@ts-ignore
import * as html2pdf from 'html2pdf.js';

import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import { OrderData } from '../../../user/orders/orders.components';

@Component({
  selector: 'app-print-order',
  templateUrl: './print-order.component.html',
  styleUrls: ['./print-order.component.scss'],
})
export class PrintOrderComponent implements OnInit, OnDestroy, AfterViewInit{
  public data: OrderData;
  private routeSubscriber: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.routeSubscriber = this.route.paramMap.subscribe((params: ParamMap) => {
      const data = params.get('data');
      if(data)
        this.data = JSON.parse(data);
    })
  }

  public ngOnDestroy(): void {
    this.routeSubscriber.unsubscribe();
  }

  public ngAfterViewInit(): void {
    const options = {
      filename: `order${this.data.orderNo}.pdf`,
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { orientation: 'landscape' }
    };

    const content: HTMLElement | null = document.getElementById('print-content');

    html2pdf()
      .from(content)
      .set(options)
      .save();
  }
}
