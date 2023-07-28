import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginErrorResponse, LoginOkResponse } from '../interfaces/login-response.interface';
import { HelpersUtil } from '../utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiBaseUrl}/${environment.merchantId}/users/logins`;

  constructor(private http: HttpClient, private helper: HelpersUtil) { }

  login(username: string, password: string): Observable<LoginOkResponse | LoginErrorResponse> {
    const body = { username, password };
    return this.http.post<LoginOkResponse | LoginErrorResponse>(this.baseUrl, body);
  }

  logout(){
    this.helper.deleteAuthToken();
  }
}
