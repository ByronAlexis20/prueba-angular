import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../interfaces/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private baseUrl = `${environment.apiBaseUrl}/${environment.merchantId}/news`;

  constructor(private http: HttpClient) { }

  getAllNews(): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(this.baseUrl);
  }

  getNewsById(id: number): Observable<ApiResponse[]> {
    return this.http.get<ApiResponse[]>(`${this.baseUrl}/${id}`);
  }
}
