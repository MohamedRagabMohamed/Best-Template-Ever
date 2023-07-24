import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@service/auth/authentication.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          const snapshot: RouterStateSnapshot =
            this.router.routerState.snapshot;
          this.authenticationService.logout().subscribe((res) => {
            if (!res.success) {
              if (snapshot.url != '/authentication/signin')
                localStorage.setItem('redirectTo', snapshot.url);
              this.router.navigate(['/authentication/signin']);
            }
          });
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
