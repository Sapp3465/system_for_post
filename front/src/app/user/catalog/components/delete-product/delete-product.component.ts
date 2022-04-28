import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { DataTableProducts } from '../../catalog.components';
import { CatalogState } from '@core/reducers/catalog/catalog.reducers';
import { DeleteProductAction } from '@core/reducers/catalog/catalog.actions';
import { selectProducts } from '@core/reducers/catalog/catalog.selector';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
    styleUrls: [ './delete-product.component.scss', '../../../styles/common_dialog.components.scss' ]
})
export class DeleteProductComponent implements OnInit, OnDestroy{
  private dataObserver$: Subscription;

  private sendingToServer: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DataTableProducts,
              private dialogRef: MatDialogRef<DeleteProductComponent>,
              private catalogStore: Store<CatalogState>) {
  }

  public ngOnInit(): void {
    this.dataObserver$ = this.catalogStore.pipe(select(selectProducts)).subscribe(() => {
      if(this.sendingToServer) this.dialogRef.close();
    })
  }

  public ngOnDestroy(): void {
    this.dataObserver$.unsubscribe();
  }

  public deleteItem(): void {
    if(this.data.id){
      this.sendingToServer = true;
      this.catalogStore.dispatch(new DeleteProductAction({ id: this.data.id }))
    }
  }
}
