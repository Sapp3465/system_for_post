import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Observable, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';

import { SnackbarService } from '@core/services/snackbar/snackbar.service';
import { ValidateCsv } from '@core/services/validate-csv/validate-csv';
import { CatalogState } from '@core/reducers/catalog/catalog.reducers';
import {GetAllCustomerNoAction, ReplaceCatalogAction} from '@core/reducers/catalog/catalog.actions';
import { LoadingService } from '@core/services/loading/loading.service';
import {selectCatalogAllCustomersNo, selectCatalogReplaceError} from "@core/reducers/catalog/catalog.selector";
import {DataTableProducts} from "../../catalog.components";

@Component({
  selector: 'app-replace-catalog',
  templateUrl: './replace-catalog.component.html',
    styleUrls: ['./replace-catalog.component.scss', '../../../styles/common_dialog.components.scss']
})
export class ReplaceCatalogComponent implements OnInit, OnDestroy{
  private replaceServerError: Subscription;
  private allCustomersNoSubscription: Subscription;

  private allCustomersNo: string[];
  public isLoadedFile: boolean = false;
  private file: File;
  public errors: string[] = [];
  public startLoad: boolean = false;
  private isLoadSubscriber: Subscription;
  private parseData: DataTableProducts[];

  constructor(
    private dialogRef: MatDialogRef<ReplaceCatalogComponent>,
    private snackbarService: SnackbarService,
    private validatorCsv: ValidateCsv,
    private catalogStore: Store<CatalogState>,
    private loadService: LoadingService) {
  }

  public ngOnInit(): void {
    this.isLoadSubscriber = this.loadService.isLoading$.subscribe((data: boolean) => {
      if(this.startLoad && !data) {
        this.startLoad = false;
        this.dialogRef.close();
        this.snackbarService.open(
          'wait',
          'Catalog Replace',
          'The file is being processed. It may take several seconds.'
        )
      }
    })
    this.replaceServerError = this.catalogStore.pipe(select(selectCatalogReplaceError))
      .subscribe((data: string) => {
      if(data.trim()) this.errors = data.split(';');
    });
    this.catalogStore.dispatch(new GetAllCustomerNoAction());
    this.allCustomersNoSubscription = this.catalogStore.pipe(select(selectCatalogAllCustomersNo))
      .subscribe((data: string[]) => {
        this.allCustomersNo = data;
      })
  }

  public ngOnDestroy(): void {
    this.isLoadSubscriber.unsubscribe();
    this.replaceServerError.unsubscribe();
  }

  public onLoad(file: File): void {
    this.file = file;
    this.isLoadedFile = true;
  }

  public checkData(): void {
    if(!this.errors.length){
      this.startLoad = true;
      this.catalogStore.dispatch(new ReplaceCatalogAction(this.parseData));
    }
  }

  public loadedData(data: string | ArrayBuffer | null): void {
    const { errors, result } = this.validatorCsv.validate(data, this.allCustomersNo);
    this.errors = errors;
    this.parseData = result;
  }
}
