import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { product } from '../model/product.model';
const headers = new HttpHeaders().set('Access-Control-Allow-Origin', '*'); 
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl='http://localhost:8080/';
  constructor(private http:HttpClient) { }
  getAllProducts():Observable<product[]>{
    return this.http.get<product[]>(this.baseUrl+'product')
                    .pipe(catchError(this.handleError));
  }

  getProductById(id:string){
    return this.http.get<product>(`${this.baseUrl+'product/id'}/${id}`)
                    .pipe(catchError(this.handleError));
  }

  updateProduct(product:product){
    return this.http.put(`${this.baseUrl}product/update`,product,{ headers})
                  .pipe(catchError(this.handleError));
  }

  addProduct(product:product){
    return this.http.post(`${this.baseUrl}product/insert`,product)
                    .pipe(catchError(this.handleError));
  }
  
  getSearchProduct(name:string){
    return this.http.get<product[]>(`${this.baseUrl+'product/productname'}/${name}`)
                    .pipe(catchError(this.handleError));
  }

  getProductByCategory(name:string){
    return this.http.get<product[]>(`${this.baseUrl+'product/category'}/${name}`)
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