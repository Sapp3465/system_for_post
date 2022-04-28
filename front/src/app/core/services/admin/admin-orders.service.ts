import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {
  private _basicURL = 'http://localhost:3001/admin/';

  constructor(private http: HttpClient) {
  }

  private _urlBuilder(name: string, ...params: string[]): string {
    return this._basicURL + name + '/' + params.join('/')
  }
}
