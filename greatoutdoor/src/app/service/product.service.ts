import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../model/product.model';
const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*'); 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl='http://localhost:8080/';
  constructor(private http:HttpClient) { }
  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.baseUrl+'product')
                    .pipe(catchError(this.handleError));
  }

  getProductById(id:string){
    return this.http.get<Product>(`${this.baseUrl+'product/id'}/${id}`)
    // `${this.baseUrl+'cart/userid'}/${userid}`/cart/userid/{userid}
                    .pipe(catchError(this.handleError));
  }

  updateProduct(product:Product){
    return this.http.put(`${this.baseUrl}product/update`,product,{ headers})
                  .pipe(catchError(this.handleError));
  }

  addProduct(product:Product){
    return this.http.post(`${this.baseUrl}product/insert`,product)
                    .pipe(catchError(this.handleError));
  }
  
  getSearchProduct(name:string){
    return this.http.get<Product[]>(`${this.baseUrl+'product/productname'}/${name}`)
                    .pipe(catchError(this.handleError));
  }

  getProductByCategory(name:string){
    return this.http.get<Product[]>(`${this.baseUrl+'product/category'}/${name}`)
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
