import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Global } from '../utils/global.model';
import { map } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  reqHeader:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
  constructor(
    private http:HttpClient
  ) { }
  getAll(){
    return this.http.get(
      `${Global.url}/groups`, 
      { headers: this.reqHeader }
    ).pipe(
      map( (resp:any) => {
        return resp.result.map((e:any)=>(new Group(e)));
      })
    );
  }
}
