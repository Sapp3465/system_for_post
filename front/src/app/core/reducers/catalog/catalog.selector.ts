import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';

import { catalogNode, CatalogState } from '@core/reducers/catalog/catalog.reducers';
import { DataTableProducts } from '../../../user/catalog/catalog.components';

export type CatalogFeatureType = MemoizedSelector<object, CatalogState, DefaultProjectorFn<CatalogState>>;
export type DataCatalogSelectorType = MemoizedSelector<object, DataTableProducts[], DefaultProjectorFn<DataTableProducts[]>>;
export type StringCatalogSelectorType = MemoizedSelector<object, string, DefaultProjectorFn<string>>;
export type NumberCatalogSelectorType = MemoizedSelector<object, number, DefaultProjectorFn<number>>;
export type StringArrayCatalogSelectorType = MemoizedSelector<object, string[], DefaultProjectorFn<string[]>>;

export const selectorCatalogFeature: CatalogFeatureType = createFeatureSelector<CatalogState>( catalogNode );

export const selectProducts: DataCatalogSelectorType = createSelector( selectorCatalogFeature,
  (state: CatalogState): DataTableProducts[] => state.catalog);

export const selectCatalogSize: NumberCatalogSelectorType = createSelector( selectorCatalogFeature,
  (state: CatalogState): number => state.catalogSize);

export const selectCatalogAddError: StringCatalogSelectorType = createSelector( selectorCatalogFeature,
  (state: CatalogState): string => state.catalogAddError);

export const selectCatalogReplaceError: StringCatalogSelectorType = createSelector( selectorCatalogFeature,
  (state: CatalogState): string => state.catalogReplaceError);

export const selectCatalogEditError: StringCatalogSelectorType = createSelector( selectorCatalogFeature,
  (state: CatalogState): string => state.catalogEditError);

export const selectCatalogAllCustomersNo: StringArrayCatalogSelectorType = createSelector( selectorCatalogFeature,
  (state: CatalogState): string[] => state.allCustomersNo);

export const selectCatalogAllProductsCode: StringArrayCatalogSelectorType = createSelector( selectorCatalogFeature,
  (state: CatalogState): string[] => state.allProductsCode);
