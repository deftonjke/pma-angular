import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UrlInterceptor } from './main-url.interceptor';
import { UserTokenInterceptor } from './user-token.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: UserTokenInterceptor, multi: true },
];
