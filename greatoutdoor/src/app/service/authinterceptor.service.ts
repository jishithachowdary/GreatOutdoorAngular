import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../model/user.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
        console.log("inside");     
        let modifiedReq = req;
        let user=sessionStorage.getItem('currentUser');
        if (sessionStorage.getItem('token')) {
            console.log("interceptor");
            console.log('With Token --- ' + sessionStorage.getItem('token'));
            modifiedReq = req.clone({
                setHeaders: {
                    Authorization: sessionStorage.getItem('token')
                  }
            });
        }
        return next.handle(modifiedReq);
    }
}