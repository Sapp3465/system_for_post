import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataTableCustomers} from "../../../user/customers/customers.components";

export interface CustomersResponse {
  size: number,
  data: DataTableCustomers[]
}

export interface MessageType {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AdminCustomersService {
  private _basicURL = 'http://localhost:3001/admin/';
  private _getCustomersName = 'getCustomers';
  private _editCustomerURL = this._basicURL + 'editCustomer';
  private _getCustomersLikeName = 'getCustomersLike'

  constructor(private http: HttpClient) {
  }

  private _urlBuilder(name: string, ...params: string[]): string {
    return this._basicURL + name + '/' + params.join('/')
  }

  public getCustomers(start: number, howMany: number): Observable<CustomersResponse> {
    return this.http.get<CustomersResponse>(
      this._urlBuilder(this._getCustomersName, start.toString(), howMany.toString()) )
  }

  public editCustomer(data: DataTableCustomers): Observable<MessageType> {
    const { id, no, deliveryDays } = data;
    return this.http.put<MessageType>( this._editCustomerURL,  { id, no, deliveryDays }  )
  }

  public getCustomersLike(start: number, howMany: number, template: string): Observable<CustomersResponse> {
    return this.http.get<CustomersResponse>(
      this._urlBuilder(this._getCustomersLikeName, template, start.toString(), howMany.toString()) )
  }
}
