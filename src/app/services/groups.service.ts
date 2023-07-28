import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private baseUrl = `${environment.apiBaseUrl}/${environment.merchantId}/groups`;

  constructor(private http: HttpClient) { }

  getAllGroups(): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(this.baseUrl);
  }

  getGroupsById(id: number): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${this.baseUrl}/${id}`);
  }
}
