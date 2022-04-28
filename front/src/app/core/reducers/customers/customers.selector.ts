import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { DataTableCustomers } from '../../../user/customers/customers.components';
import { customersNode, CustomersState } from '@core/reducers/customers/customers.reducers';

export type CustomersFeatureType = MemoizedSelector<object, CustomersState, DefaultProjectorFn<CustomersState>>;
export type DataCustomersSelectorType = MemoizedSelector<object, DataTableCustomers[], DefaultProjectorFn<DataTableCustomers[]>>;
export type SizeType = MemoizedSelector<object, number, DefaultProjectorFn<number>>;
export type StringUsersType = MemoizedSelector<object, string, DefaultProjectorFn<string>>;

export const selectorCustomersFeature: CustomersFeatureType = createFeatureSelector<CustomersState>( customersNode );

export const selectCustomers: DataCustomersSelectorType = createSelector( selectorCustomersFeature,
  (state: CustomersState): DataTableCustomers[] => state.customers);

export const selectCustomersSize: SizeType = createSelector( selectorCustomersFeature,
  (state: CustomersState): number => state.customersSize);

export const selectCustomersError: StringUsersType = createSelector( selectorCustomersFeature,
  (state: CustomersState): string => state.customersError);
