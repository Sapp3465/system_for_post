import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveComponentModule } from '@ngrx/component';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { MenuComponents } from './menu/menu.components';
import { HeaderComponents } from './header/header.components';
import { MenuButtonComponents } from './menu-button/menu-button..components';
import { SharedModule } from '@shared/shared.module';
import { HeaderButtonComponents } from './header-button/header-button.components';
import { HeaderInputComponents } from './header-input/header-input.components';
import { CustomPaginatorComponents } from './custom-paginator/custom-paginator.components';
import { EmptyTableComponents } from './empty-table/empty-table.components';
import { DialogBottomComponent } from './dialog-bottom/dialog-bottom.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { SortIconComponents } from './sort-icon/sort-icon.components';

type ComponentsType =
  typeof MenuComponents |
  typeof HeaderComponents |
  typeof MenuButtonComponents |
  typeof HeaderButtonComponents |
  typeof HeaderInputComponents |
  typeof CustomPaginatorComponents |
  typeof EmptyTableComponents |
  typeof DialogBottomComponent |
  typeof DialogHeaderComponent |
  typeof SortIconComponents;

const components : ComponentsType[] = [
  MenuComponents,
  HeaderComponents,
  MenuButtonComponents,
  HeaderButtonComponents,
  HeaderInputComponents,
  CustomPaginatorComponents,
  EmptyTableComponents,
  DialogBottomComponent,
  DialogHeaderComponent,
  SortIconComponents,
];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    SharedModule,
    MatTooltipModule,
    ReactiveComponentModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [components]
})
export class UserComponentsModule {}
