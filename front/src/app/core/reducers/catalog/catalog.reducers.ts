import {ActionReducer} from '@ngrx/store';

import {DataTableProducts} from '../../../user/catalog/catalog.components';
import {CatalogActions, catalogActionsType} from '@core/reducers/catalog/catalog.actions';

export type CatalogNodeType = 'catalog';
export const catalogNode: CatalogNodeType = 'catalog';

export interface CatalogState {
  catalogSize: number,
  catalogAddError: string,
  catalogReplaceError: string,
  catalogEditError: string,
  catalog: DataTableProducts[],
  allCustomersNo: string[],
  allProductsCode: string[]
}

const initialState: CatalogState = {
  catalogSize: 0,
  catalogAddError: '',
  catalogReplaceError: '',
  catalogEditError: '',
  catalog: [],
  allCustomersNo: [],
  allProductsCode: []
};

export const catalogReducer: ActionReducer<CatalogState, CatalogActions> =
  (state: CatalogState = initialState, action: CatalogActions): CatalogState => {
    switch (action.type) {
      case catalogActionsType.changeProducts:
        return { ...state, catalog: action.payload.data, catalogSize: action.payload.size }
      case catalogActionsType.deleteProductFromState:
        return {
          ...state,
          catalog: state.catalog.filter((obj: DataTableProducts) => obj.id !== action.payload.id),
          catalogSize: state.catalogSize - 1
        }
      case catalogActionsType.addProductToState:
        return { ...state, catalogEditError: state.catalogEditError.trim() ? ' ' : state.catalogEditError + ' ' }
      case catalogActionsType.editProductFromState:
        return { ...state, catalog: state.catalog.map((obj : DataTableProducts) => {
          if(obj.id === action.payload.id) return { ...obj, ...action.payload };
            return obj;
          }), catalogEditError: state.catalogEditError.trim() ? ' ' : state.catalogEditError + ' ' }
      case catalogActionsType.setAllCustomerNo: return { ...state, allCustomersNo: action.payload }
      case catalogActionsType.setAllProductsCode: return { ...state, allProductsCode: action.payload }
      case catalogActionsType.setCatalogEditError: return { ...state, catalogEditError: action.payload }
      case catalogActionsType.setCatalogReplaceError: return { ...state, catalogReplaceError: action.payload }
      case catalogActionsType.setCatalogAddError: return { ...state, catalogAddError: action.payload }
      case catalogActionsType.successCatalogReplace:
        return { ...state, catalogReplaceError: state.catalogReplaceError.trim() ? ' ' : state.catalogReplaceError + ' '  }
      default:
        return state;
    }
  }
