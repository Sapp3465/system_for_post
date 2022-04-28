import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DaysType } from '@shared/components';
import { StatusType } from '@core/reducers/auth/auth.reducers';

export interface EmailType {
  email: string,
}

export interface AuthResponse {
  token: string,
  status: StatusType
}

export interface TokenType {
  token : string
}

export interface RegistrationType {
  email: string,
  name: string,
  address: string,
  contactName: string,
  deliveryDays: DaysType,
  mobilePhone?: string,
  no: string
}

export interface Code {
  secretKey: string
}

export interface Error {
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _basicURL = 'http://localhost:3001/auth/';
  private _registrationURL = this._basicURL + 'sendRegistration';
  private _loginURL = this._basicURL + 'sendLogin';
  private _sendLoginCodeURL = this._basicURL + 'login';
  private _sendRegistrationCodeURL = this._basicURL + 'register';
  private _TOKEN = 'token';
  private _STATUS = 'status';

  constructor(private http: HttpClient) {
  }

  public registrationUser(user: RegistrationType): Observable<TokenType> {
    return this.http.post<TokenType>( this._registrationURL, user )
  }

  public loginUser(user: EmailType): Observable<TokenType> {
    return this.http.post<TokenType>( this._loginURL, user )
  }

  public sendLoginCode(secretKey: Code): Observable<AuthResponse> {
    return this.http.post<AuthResponse>( this._sendLoginCodeURL, secretKey )
  }

  public sendRegistrationCode(secretKey: Code): Observable<AuthResponse> {
    return this.http.post<AuthResponse>( this._sendRegistrationCodeURL, secretKey )
  }

  public storeResponse(data: AuthResponse): void {
    localStorage.setItem(this._TOKEN, data.token)
    localStorage.setItem(this._STATUS, data.status)
  }

  public get isLoggedIn(): boolean {
    return !!localStorage.getItem(this._TOKEN)
  }

  public get getToken(): string | null {
    return localStorage.getItem(this._TOKEN)
  }

  public get getStatus(): StatusType | null {
    return localStorage.getItem(this._STATUS) as StatusType;
  }

  public logoutUser(): void {
    localStorage.removeItem(this._TOKEN)
    localStorage.removeItem(this._STATUS)
  }
}
