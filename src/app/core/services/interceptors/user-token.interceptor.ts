import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class UserTokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.userService.getTokenFromLS();
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next.handle(req);
  }
}
