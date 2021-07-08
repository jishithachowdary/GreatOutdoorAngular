import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Order } from '../model/order.model';
import { OrderDao } from '../model/OrderDao.model';
import { OrderRequest } from '../model/orderRequest.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl='http://localhost:8080/';
  constructor(private http:HttpClient) { }
  getAllOrders():Observable<Order[]>{
    return this.http.get<Order[]>(this.baseUrl+'orders')
                .pipe(catchError(this.handleError));
  }

  getOrderById(id:string){
    console.log(id);
    return this.http.get<Order[]>(`${this.baseUrl+'ordersById'}/${id}`)
                      .pipe(catchError(this.handleError));
  }

  updateOrder(order:OrderDao){
    return this.http.put(`${this.baseUrl}changingdate`,order)
      .pipe(catchError(this.handleError));
  }
  // `${this.baseUrl}order/update/${orderId}/dispatch/${dispatchDate}/arrival/${arrivalDate}`
  //order/deleteById/{orderId}
  searchOrderByUserId(user:String){
    return this.http.get<Order[]>(`${this.baseUrl+'ordersById'}/${user}`)
          .pipe(catchError(this.handleError));
  }
  addOrder(order:OrderRequest){
    console.log(order);
    return this.http.post(`${this.baseUrl}order/insert`,order)
                    .pipe(catchError(this.handleError));
  }

  deleteOrder(oid:string){
    return this.http.delete(`${this.baseUrl+'order/deleteById'}/${oid}`)
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
