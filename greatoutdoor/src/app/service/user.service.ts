
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private baseUrl = 'http://localhost:8080/'; 
    constructor(private http: HttpClient){}
    getAllUsers(): Observable<any>{
       return this.http.get<User[]>(this.baseUrl+'users');
    }

    getUserById(id:string){
        return this.http.get<User>(`${this.baseUrl+'user'}/${id}`)
                        .pipe(catchError(this.handleError));
    }

    updateUser(user:User){
      return this.http.put(`${this.baseUrl}userupdate`,user)
            .pipe(catchError(this.handleError));
    }
    private handleError(httpError:HttpErrorResponse){
        if(httpError.error instanceof ErrorEvent){
          console.error('An error occured:',httpError.error.message);
        }
        else{
          console.error(
            `Backend returned code ${httpError.status}`+
            `body was:${httpError.error}`);
          }
          return throwError('Something went wrong');
        }

   
}