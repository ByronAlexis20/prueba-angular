import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HelpersUtil } from './helpers';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private _router: Router, private helper: HelpersUtil, private cookies: CookieService) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let token = this.helper.getAuthToken();
        if(token == null || token == undefined || token == ""){
            this.helper.deleteAuthToken();
            this._router.navigate(['/']);
            return false;
        }
        return true;
    }
}
