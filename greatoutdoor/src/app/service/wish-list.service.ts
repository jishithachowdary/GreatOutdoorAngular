import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CartRequest } from '../model/cartrequest.model';
import { Product } from '../model/product.model';
import { WishDao } from '../model/wishdao.model';
import { WishListRequest } from '../model/wishListRequest.model';


@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private baseUrl='http://localhost:8080/';
  constructor(private http:HttpClient) { }
  getWishList(userId:string){
    return this.http.get<WishDao[]>(`${this.baseUrl+'wishlist/userid'}/${userId}`)
              .pipe(catchError(this.handleError));
  }
 addProductToWishList(id:number,pro:Product){
   return this.http.put(`${this.baseUrl+'wishlist/addproduct'}/${id}`,pro)
              .pipe(catchError(this.handleError));
 }
 getWishLitItem(p:string,id:string){
    return this.http.get<WishDao>(`${this.baseUrl+'wishlist/productid'}/${p}/${id}`)
            .pipe(catchError(this.handleError));
 }
 addWish(wish:WishListRequest){
    return this.http.post(`${this.baseUrl}wishlist/insert`,wish)
      .pipe(catchError(this.handleError));
 }
 
 deleteProduct(pid:string,uid:string){
   return this.http.delete(`${this.baseUrl+'whishlist/delete/product'}/${pid}/${uid}`)
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
