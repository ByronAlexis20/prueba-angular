import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HelpersUtil {
  private authTokenKey = 'authToken';
  constructor(private cookieService: CookieService) {}

  getAuthToken(): string {
    return this.cookieService.get(this.authTokenKey);
  }

  saveAuthToken( res: any ): void {
    if( res.count > 0){
      this.cookieService.set(this.authTokenKey, res.result[0].access_token);
    }
  }

  deleteAuthToken(): void {
    this.cookieService.delete(this.authTokenKey);
  }
}