import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!window.navigator.onLine) {
            alert('Compruebe su conexión a internet');
            this.router.navigateByUrl('/login');
            return throwError(() => new HttpErrorResponse({ error: 'Compruebe su conexión a internet.'}));
        } else {
            if (sessionStorage.getItem('token_fks')) {
                const clonedreq = req.clone({
                    // headers: req.headers.set("Authorization", "Bearer " + sessionStorage.getItem('token_fks'))
                });
                return next.handle(clonedreq).pipe(
                    tap((ev: HttpEvent<any>) => {
                        if (ev instanceof HttpResponse) {
                            if(ev.body.errors) {
                                alert(ev.body.errors.map((e:any) => (`${e.title}/n`)))
                                sessionStorage.clear();
                                this.router.navigateByUrl('/login');
                            }
                        }
                    }),
                    catchError( (error) => {
                        alert("Error inesperado, consulte con su proveedor.")
                        if (error.status === 401)
                            this.router.navigateByUrl('/login');
                        return throwError(() => error);
                    }));
            }
            else {
                this.router.navigateByUrl('/login');
                return throwError(() => new HttpErrorResponse({ error: 'Parametros incompletos' }));
            }
        }
    }
}