import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/user.model';


const headers = new HttpHeaders().set('Content-Type', 'application/json');
@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private baseUrl = 'http://localhost:8080/'; 
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public name:string;

    constructor(private http: HttpClient,  private router: Router){
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        // console.log("service");
        // console.log(this.currentUser);
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    login(username: string, password: string) {
        this.name=username;
        return this.http.post<any>(this.baseUrl + 'login', 
            new User(username,'',password), {headers})
            .pipe(catchError(this.handleError),
                (map(user => {
                    // login successful if there's a jwt token in the response
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        // sessionStorage.setItem('currentUser', user);
                        sessionStorage.setItem('token',"Bearer "+user.token);
                        sessionStorage.setItem('roles',user.roles);
                        this.currentUserSubject.next(user);
                    }
    
                    return user;
                })));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    
    signup(user: User): Observable<any>{
        console.log('In AuthService');
        return this.http.post<User>(this.baseUrl + 'signup', user);
    }

    private handleError(httpError: HttpErrorResponse) {
        let message:string = '';

        if (httpError.error instanceof ProgressEvent) {
            console.log('in progrss event')
            message = "Network error";
        }
        // else if (httpError.error instanceof ErrorEvent) {
        //   // A client-side or network error occurred. Handle it accordingly.
        //   message = httpError.error.message;
        //   console.error('An error occurred:', httpError.error.message);
        // } 
        else {
            message = httpError.error.message;
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong.
          console.error(
            `Backend returned code ${httpError.status}, ` +
            `body was: ${httpError.error}`);
        }
        // Return an observable with a user-facing error message.
        return throwError(message);
      }

    
}