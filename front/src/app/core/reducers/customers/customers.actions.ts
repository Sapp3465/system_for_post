import { Action } from '@ngrx/store';

import { PageType } from '@core/reducers/user/user.reducers';
import { DataTableCustomers } from '../../../user/customers/customers.components';
import {CustomersResponse} from "@core/services/admin/admin-customers.service";

export enum customersActionsType {
  getCustomers = '[CUSTOMERS] get customers', //to effects
  editCustomer = '[CUSTOMERS] edit customer', //to effects
  getCustomersLike = '[CUSTOMERS] get customer by template', //to effects
  addCustomers = '[CUSTOMERS] add new customers to state', //to reducer
  changeCustomerById = '[CUSTOMERS] change customer data by id', //to reducer
  addCustomersError = '[CUSTOMERS] add customers error' //to reducer
}

export class AddCustomersAction implements Action {
  readonly type = customersActionsType.addCustomers;

  constructor(public payload: CustomersResponse) {
  }
}

export class GetCustomersAction implements Action {
  readonly type = customersActionsType.getCustomers;

  constructor(public payload: { start: number, howMany: number }) {
  }
}

export class EditCustomerAction implements Action {
  readonly type = customersActionsType.editCustomer;

  constructor(public payload: { data : DataTableCustomers }) {
  }
}

export class GetCustomersLikeAction implements Action {
  readonly type = customersActionsType.getCustomersLike;

  constructor(public payload: { template: string, start: number, howMany: number }) {
  }
}

export class AddCustomersErrorAction implements Action {
  readonly type = customersActionsType.addCustomersError;

  constructor(public payload: { message: string }) {
  }
}

export class ChangeCustomerByIdAction implements Action {
  readonly type = customersActionsType.changeCustomerById;

  constructor(public payload: DataTableCustomers ) {
  }
}

export type CustomersActions =
  AddCustomersAction |
  GetCustomersAction |
  EditCustomerAction |
  GetCustomersLikeAction |
  AddCustomersErrorAction |
  ChangeCustomerByIdAction;
