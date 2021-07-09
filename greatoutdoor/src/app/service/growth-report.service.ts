import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GrowthReport } from '../model/growthReport.model';

@Injectable({
  providedIn: 'root'
})
export class GrowthReoprtService {
  private baseUrl = 'http://localhost:8080/'; 
  constructor(private http: HttpClient){}

  getAllGrowthReports():Observable<any>{
    return this.http.get<GrowthReport[]>(this.baseUrl+'growthreport');
  }
}
