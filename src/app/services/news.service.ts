import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, map } from 'rxjs';
import { News } from '../models/news.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  reqHeader:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
  constructor(
    private http:HttpClient
  ) { }
  getAll() {
    return this.http.get<News[]>(
      `${environment.api}/news`, 
      { headers: this.reqHeader }
    ).pipe(
      map( (resp:any) => {
        return resp.result;
        // .map((e:News)=>(new News(e)));
      })
    );
  }
  getById(id: number) {
    return this.http.get<News>(
      `${environment.api}/news/${id}`, 
      { headers: this.reqHeader }
    ).pipe(
      map( (resp:any) => {
        return resp.result[0] || undefined;
      })
    );
  }
}
