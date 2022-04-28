import { Action } from '@ngrx/store';

import {CustomersResponse} from "@core/services/admin/admin-customers.service";
import {DataTableProducts} from "../../../user/catalog/catalog.components";
import {CatalogResponse, SortAvailabilityType} from "@core/services/admin/admin-catalog.service";

export enum catalogActionsType {
  //to effects
  getProducts = '[CATALOG] get products',
  deleteProduct = '[CATALOG] delete product',
  addProduct = '[CATALOG] add product',
  editProduct = '[CATALOG] edit product',
  getAllCustomerNo = '[CATALOG] get all customers no',
  getAllProductsCode = '[CATALOG] get all products code',
  replaceCatalog = '[CATALOG] replace catalog',
  sortAvailability = '[CATALOG] sort availability',
  getProductsLike = '[CATALOG] get products like',

  //to reducer
  changeProducts = '[CATALOG] change catalog in state',
  deleteProductFromState = '[CATALOG] delete product from state',
  addProductToState = '[CATALOG] add product to state', //remove
  editProductFromState = '[CATALOG] edit product from state',
  setAllCustomerNo = '[CATALOG] set all customers no',
  setAllProductsCode = '[CATALOG] set all products code',
  setCatalogAddError = '[CATALOG] set catalog add error',
  setCatalogReplaceError = '[CATALOG] set catalog replace error',
  setCatalogEditError = '[CATALOG] set catalog edit error',
  successCatalogReplace = '[CATALOG] success catalog replace'
}

export class GetProductsAction implements Action {
  readonly type = catalogActionsType.getProducts;

  constructor(public payload: { start: number, howMany: number }) {
  }
}

export class DeleteProductAction implements Action {
  readonly type = catalogActionsType.deleteProduct;

  constructor(public payload: { id: number }) {
  }
}

export class AddProductAction implements Action {
  readonly type = catalogActionsType.addProduct;

  constructor(public payload: DataTableProducts) {
  }
}

export class EditProductAction implements Action {
  readonly type = catalogActionsType.editProduct;

  constructor(public payload: DataTableProducts) {
  }
}

export class GetAllCustomerNoAction implements Action {
  readonly type = catalogActionsType.getAllCustomerNo;
}

export class GetAllProductsCodeAction implements Action {
  readonly type = catalogActionsType.getAllProductsCode;
}

export class SuccessCatalogReplaceAction implements Action {
  readonly type = catalogActionsType.successCatalogReplace;
}

export class ReplaceCatalogAction implements Action {
  readonly type = catalogActionsType.replaceCatalog;

  constructor(public payload: DataTableProducts[]) {
  }
}

export class SortAvailabilityAction implements Action {
  readonly type = catalogActionsType.sortAvailability;

  constructor(public payload: SortAvailabilityType) {
  }
}

export class GetProductsLikeAction implements Action {
  readonly type = catalogActionsType.getProductsLike;

  constructor(public payload: { template: string, start: number, howMany: number }) {
  }
}

export class ChangeProductsAction implements Action {
  readonly type = catalogActionsType.changeProducts;

  constructor(public payload: CatalogResponse) {
  }
}

export class DeleteProductFromStateAction implements Action {
  readonly type = catalogActionsType.deleteProductFromState;

  constructor(public payload: { id: number }) {
  }
}

export class AddProductToStateAction implements Action {
  readonly type = catalogActionsType.addProductToState;

  constructor(public payload: DataTableProducts) {
  }
}

export class EditProductFromStateAction implements Action {
  readonly type = catalogActionsType.editProductFromState;

  constructor(public payload: DataTableProducts) {
  }
}

export class SetAllCustomerNoAction implements Action {
  readonly type = catalogActionsType.setAllCustomerNo;

  constructor(public payload: string[]) {
  }
}

export class SetAllProductsCodeAction implements Action {
  readonly type = catalogActionsType.setAllProductsCode;

  constructor(public payload: string[]) {
  }
}

export class SetCatalogAddErrorAction implements Action {
  readonly type = catalogActionsType.setCatalogAddError;

  constructor(public payload: string) {
  }
}

export class SetCatalogReplaceErrorAction implements Action {
  readonly type = catalogActionsType.setCatalogReplaceError;

  constructor(public payload: string) {
  }
}

export class SetCatalogEditErrorAction implements Action {
  readonly type = catalogActionsType.setCatalogEditError;

  constructor(public payload: string) {
  }
}

export type CatalogActions =
  GetProductsAction |
  DeleteProductAction |
  AddProductAction |
  EditProductAction |
  GetAllCustomerNoAction |
  GetAllProductsCodeAction |
  ReplaceCatalogAction |
  SortAvailabilityAction |
  GetProductsLikeAction |
  ChangeProductsAction |
  DeleteProductFromStateAction |
  AddProductToStateAction |
  EditProductFromStateAction |
  SetAllCustomerNoAction |
  SetAllProductsCodeAction |
  SetCatalogAddErrorAction |
  SetCatalogReplaceErrorAction |
  SetCatalogEditErrorAction |
  SuccessCatalogReplaceAction;
