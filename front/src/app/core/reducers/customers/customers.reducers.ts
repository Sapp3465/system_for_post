import {ActionReducer} from '@ngrx/store';

import { DataTableCustomers } from '../../../user/customers/customers.components';
import { CustomersActions, customersActionsType } from '@core/reducers/customers/customers.actions';

export type CustomersNodeType = 'customers';
export const customersNode: CustomersNodeType = 'customers';

export interface CustomersState {
  customersSize: number,
  customersError: string,
  customers: DataTableCustomers[],
}

const initialState: CustomersState = {
  customersSize: 0,
  customersError: '',
  customers: [],
};

export const customersReducer: ActionReducer<CustomersState, CustomersActions> =
  (state: CustomersState = initialState, action: CustomersActions): CustomersState => {
    switch (action.type) {
      case customersActionsType.addCustomers:
        return { ...state, customers: action.payload.data, customersSize: action.payload.size, customersError: '' }
      case customersActionsType.addCustomersError:
        return { ...state, customersError: action.payload.message }
      case customersActionsType.changeCustomerById:
        return { ...state, customers: state.customers.map((obj: DataTableCustomers) => {
            if(obj.id === action.payload.id) return { ...obj, ...action.payload}
            return obj;
          }), customersError: state.customersError + ' ' }
      default:
        return state;
    }
  }
