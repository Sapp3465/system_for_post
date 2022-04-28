import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AvailabilityType, DataTableProducts } from '../../../user/catalog/catalog.components';
import { MessageType } from '@core/services/admin/admin-customers.service';

export interface CatalogResponse {
  size: number,
  data: DataTableProducts[]
}

export interface IdType {
  id: number
}

export interface SortAvailabilityType {
  start: number,
  howMany: number,
  template: string
  data: AvailabilityType
}

@Injectable({
  providedIn: 'root'
})
export class AdminCatalogService {
  private _basicURL = 'http://localhost:3001/admin/';
  private _basicCommonURL = 'http://localhost:3001/common/';
  private _getProductsName = 'getProducts';
  private _deleteProductName = this._basicURL + 'deleteProduct/';
  private _getProductsLikeName = 'getProductsLike';

  private _addProductURL = this._basicURL + 'addProduct';
  private _editProductURL = this._basicURL + 'editProduct';
  private _allCustomersNoURL = this._basicURL + 'allCustomersNo';
  private _allProductsCodeURL = this._basicURL + 'allProductsCode';
  private _replaceCatalogURL = this._basicURL + 'replaceCatalog';
  private _sortAvailabilityURL = this._basicCommonURL + 'sortAvailability';

  constructor(private http: HttpClient) {
  }

  private _urlBuilder(name: string, ...params: string[]): string {
    return this._basicCommonURL + name + '/' + params.join('/')
  }

  public getProducts(start: number, howMany: number): Observable<CatalogResponse> {
    return this.http.get<CatalogResponse>(
      this._urlBuilder(this._getProductsName, start.toString(), howMany.toString()) )
  }

  public deleteProduct(id: number): Observable<MessageType> {
    return this.http.delete<MessageType>(
      this._deleteProductName + id.toString() )
  }

  public addProduct(data: DataTableProducts): Observable<IdType> {
    return this.http.post<IdType>(this._addProductURL, data)
  }

  public editProduct(data: DataTableProducts): Observable<MessageType> {
    return this.http.put<MessageType>(this._editProductURL, data)
  }

  public allCustomerNo(): Observable<string[]> {
    return this.http.get<string[]>(this._allCustomersNoURL)
  }

  public allProductCode(): Observable<string[]> {
    return this.http.get<string[]>(this._allProductsCodeURL)
  }

  public replaceCatalog(data: DataTableProducts[]): Observable<MessageType> {
    return this.http.post<MessageType>(this._replaceCatalogURL, data)
  }

  public sortAvailability(data: SortAvailabilityType): Observable<CatalogResponse> {
    return this.http.post<CatalogResponse>(this._sortAvailabilityURL, data)
  }

  public getProductsLike(start: number, howMany: number, template: string): Observable<CatalogResponse> {
    return this.http.get<CatalogResponse>(
      this._urlBuilder(this._getProductsLikeName, template, start.toString(), howMany.toString()) )
  }
}
