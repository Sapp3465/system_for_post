import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  AdminCatalogService,
  CatalogResponse,
  IdType,
  SortAvailabilityType
} from '@core/services/admin/admin-catalog.service';
import {
  AddProductToStateAction,
  catalogActionsType,
  ChangeProductsAction,
  DeleteProductFromStateAction,
  EditProductFromStateAction,
  SetAllCustomerNoAction, SetAllProductsCodeAction,
  SetCatalogEditErrorAction, SetCatalogReplaceErrorAction, SuccessCatalogReplaceAction
} from '@core/reducers/catalog/catalog.actions';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataTableProducts } from '../../../user/catalog/catalog.components';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class CatalogEffects {

  private getProducts$: Observable<ChangeProductsAction> = createEffect(() =>
  this.actions$.pipe(
    ofType(catalogActionsType.getProducts),
    mergeMap((data: { payload: { start: number, howMany: number } }) =>
    this.adminCatalogService.getProducts(data.payload.start, data.payload.howMany).pipe(
      map((data: CatalogResponse ) => new ChangeProductsAction(data)),
    ))
  ))

  private deleteProduct$: Observable<DeleteProductFromStateAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogActionsType.deleteProduct),
      mergeMap((data: { payload: { id: number } } ) =>
        this.adminCatalogService.deleteProduct(data.payload.id).pipe(
          map(() => new DeleteProductFromStateAction({ id: data.payload.id })),
        ))
    ))

  private addProduct$: Observable<AddProductToStateAction | SetCatalogEditErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogActionsType.addProduct),
      mergeMap((data: { payload: DataTableProducts }) =>
        this.adminCatalogService.addProduct(data.payload).pipe(
          map((dataId: IdType) => new AddProductToStateAction({...data.payload, ...dataId})),
          catchError((errMsg: HttpErrorResponse) =>  of(new SetCatalogEditErrorAction(errMsg.error.message)))

        ))
    ))

  private editProduct$: Observable<EditProductFromStateAction | SetCatalogEditErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogActionsType.editProduct),
      mergeMap((data: { payload: DataTableProducts }) =>
        this.adminCatalogService.editProduct(data.payload).pipe(
          map(() => new EditProductFromStateAction(data.payload)),
          catchError((errMsg: HttpErrorResponse) => of(new SetCatalogEditErrorAction(errMsg.error.message)))
        ))
    ))

  private getAllCustomerNo$: Observable<SetAllCustomerNoAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogActionsType.getAllCustomerNo),
      mergeMap(() =>
        this.adminCatalogService.allCustomerNo().pipe(
          map((data: string[]) => new SetAllCustomerNoAction(data)),
        ))
    ))

  private getAllProductsCode$: Observable<SetAllProductsCodeAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogActionsType.getAllProductsCode),
      mergeMap(() =>
        this.adminCatalogService.allProductCode().pipe(
          map((data: string[]) => new SetAllProductsCodeAction(data)),
        ))
    ))

  private replaceCatalog$: Observable<SetCatalogReplaceErrorAction | SuccessCatalogReplaceAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogActionsType.replaceCatalog),
      mergeMap((data: { payload: DataTableProducts[] }) =>
        this.adminCatalogService.replaceCatalog(data.payload).pipe(
          map(() => new SuccessCatalogReplaceAction()),
          catchError((errMsg: HttpErrorResponse) => of(new SetCatalogReplaceErrorAction(errMsg.error.message)))
        ))
    ))

  private sortAvailability$: Observable<ChangeProductsAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogActionsType.sortAvailability),
      mergeMap((data: { payload: SortAvailabilityType }) =>
        this.adminCatalogService.sortAvailability(data.payload).pipe(
          map((data: CatalogResponse) => new ChangeProductsAction(data)),
        ))
    ))

  private getProductsLike$: Observable<ChangeProductsAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(catalogActionsType.getProductsLike),
      mergeMap((data: { payload: { template: string, start: number, howMany: number } }) =>
        this.adminCatalogService.getProductsLike(data.payload.start, data.payload.howMany, data.payload.template).pipe(
          map((data: CatalogResponse) => new ChangeProductsAction(data)),
        ))
    ))

  constructor(private actions$: Actions, private adminCatalogService: AdminCatalogService) {
  }
}
