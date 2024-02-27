import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {


intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authReq = req.clone({
        headers: req.headers.append(
        'Authorization', 'c5LTA6WPbMwHhEabYu77nN9cn4VcMj')
    });

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
