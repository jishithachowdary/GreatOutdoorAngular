import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../model/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private baseUrl = 'http://localhost:8080/'; 
  constructor(private http: HttpClient){}

  getAllReports():Observable<any>{
    return this.http.get<Report[]>(this.baseUrl+'sales');
  }
}
