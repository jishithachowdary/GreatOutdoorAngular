import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartDao } from '../model/cartdao.model';
import { CartRequest } from '../model/cartrequest.model';
import { OrderDao } from '../model/OrderDao.model';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl='http://localhost:8080/';
  constructor(private http:HttpClient) { }
  getAllCart(userId:string){
    return this.http.get<CartDao[]>(`${this.baseUrl+'cart/userid'}/${userId}`)
        
  }
  addProductToCart(id:number,product:Product){
    return this.http.put(`${this.baseUrl+'cart/update'}/${id}`,product)
        .pipe(catchError(this.handleError))
  }

  deleteProduct(pid:string,cid:number){
    return this.http.delete(`${this.baseUrl+'cart/delete/product'}/${pid}/${cid}`)
             .pipe(catchError(this.handleError));
  }
  addCart(cart:CartRequest): Observable<any>{
    console.log("*");
    console.log(cart);
    return this.http.post(`${this.baseUrl}cart/insert`,cart)
    .pipe(catchError(this.handleError));
  }

  deleteCart(uid:string){
    return this.http.delete(`${this.baseUrl+'cart/delete'}/${uid}`)
        .pipe(catchError(this.handleError));
  }
//   applyScholarship(scholarship: Scholarship): Observable<any> {
//     return this.http.post(this.baseUrl + 'add', scholarship, { headers, responseType: 'text' })
//         .pipe(catchError(this.handleError));
// }/cart/delete/{userId}
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
