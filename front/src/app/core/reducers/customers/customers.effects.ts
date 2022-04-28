import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { AdminCustomersService, CustomersResponse, MessageType } from '@core/services/admin/admin-customers.service';
import { DataTableCustomers } from '../../../user/customers/customers.components';
import {
  AddCustomersAction, AddCustomersErrorAction,
  ChangeCustomerByIdAction,
  customersActionsType
} from '@core/reducers/customers/customers.actions';

@Injectable()
export class CustomersEffects {

  private getCustomers$: Observable<AddCustomersAction | AddCustomersErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(customersActionsType.getCustomers),
      mergeMap((data: { payload: { start: number, howMany: number } }) =>
        this.adminCustomersService.getCustomers(data.payload.start, data.payload.howMany).pipe(
          map((data: CustomersResponse) => new AddCustomersAction(data)),
          catchError((error: MessageType) => of(new AddCustomersErrorAction({ message: error.message })))
        )
      )
    ))

  private getCustomersLike$: Observable<AddCustomersAction | AddCustomersErrorAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(customersActionsType.getCustomersLike),
      mergeMap((data: { payload: { start: number, howMany: number, template: string } }) =>
        this.adminCustomersService.getCustomersLike(data.payload.start, data.payload.howMany, data.payload.template)
          .pipe(
            map((data: CustomersResponse) => new AddCustomersAction(data)),
            catchError((error: MessageType) => of(new AddCustomersErrorAction({ message: error.message })))
          )
        )
      )
  )

  private editCustomer$: Observable<AddCustomersErrorAction | ChangeCustomerByIdAction> = createEffect(() =>
    this.actions$.pipe(
      ofType(customersActionsType.editCustomer),
      mergeMap(({ payload }: { payload: DataTableCustomers }) =>
        this.adminCustomersService.editCustomer(payload)
          .pipe(
            map(() => new ChangeCustomerByIdAction(payload)),
            catchError(({error}) => {
              return of(new AddCustomersErrorAction({message: error.message}))
            })
          )
      )
    )
  )

  constructor(private actions$: Actions, private adminCustomersService: AdminCustomersService) {
  }
}
