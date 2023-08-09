import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Global } from '../utils/global.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  reqHeader:HttpHeaders = new HttpHeaders({"Content-Type": "application/json"});
  constructor(
    private router : Router, 
    private httpBackend:HttpClient,
    private http:HttpClient,
    handler: HttpBackend
  ) {
    this.httpBackend = new HttpClient(handler);
    
  }
  login(user:User) {
    return this.httpBackend.post(
      `${Global.url}/users/logins`, 
      JSON.stringify(user), 
      { headers: this.reqHeader }
    ).subscribe(
      (r:any)=>{
        sessionStorage.setItem("token",r.result[0].access_token);
        this.router.navigate(['/home']);
      },
      (err:any)=> {
        sessionStorage.setItem("token","abc1234");
        this.router.navigate(['/home']);
      }
    );
  }
}
