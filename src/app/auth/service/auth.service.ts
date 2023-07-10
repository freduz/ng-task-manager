import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../types/login-response.interface';
import { environment } from 'src/environments/environment';
import { ILoginRequest } from '../types/login-request.interface';
import { IRegisterRequest } from '../types/register-request.interface';
import { IUser } from '../types/user.interface';

const API_URL = `${environment.apiUrl}/auth`;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private readonly _http: HttpClient) {}

  login(loginRequest: ILoginRequest): Observable<ILoginResponse> {
    console.log(API_URL);
    return this._http.post<ILoginResponse>(`${API_URL}/sign-in`, loginRequest);
  }

  register(registerRequest: IRegisterRequest): Observable<string> {
    return this._http.post<string>(`${API_URL}/sign-up`, registerRequest);
  }

  getCurrentUser(): Observable<IUser> {
    return this._http.get<IUser>(`${API_URL}/get-current-user`);
  }
}
