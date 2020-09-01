import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../Services/authentication.service';

@Injectable()
export class AuthBearerInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isLoggedIn()){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.userInfo().token}`
        }
      });
    }
    return next.handle(request);
  }
}
