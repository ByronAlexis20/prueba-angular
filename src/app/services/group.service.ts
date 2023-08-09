import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from '../utils/global.model';
import { map } from 'rxjs';
import { Group } from '../models/group.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  reqHeader:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
  constructor(
    private http:HttpClient
  ) { }
  getAll(){
    return this.http.get<Group>(
      `${Global.url}/groups`, 
      { headers: this.reqHeader }
    ).pipe(
      map( (resp:any) => {
        return resp.result;
      })
    );
  }
  getById(id: number) {
    return this.http.get<Group>(
      `${environment.api}/groups/${id}`, 
      { headers: this.reqHeader }
    ).pipe(
      map( (resp:any) => {
        return resp.result[0] || undefined;
      })
    );
  }
}
