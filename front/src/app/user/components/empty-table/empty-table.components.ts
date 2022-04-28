import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-table',
  templateUrl: './empty-table.components.html',
  styleUrls: ['./empty-table.components.scss']
})
export class EmptyTableComponents {
  @Input('name') name: string;
}
