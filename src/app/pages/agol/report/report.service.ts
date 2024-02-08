import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AirportModel } from './airport.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  readJsonFromAsset(){
    const url = `assets/json/airports.json`
    return this.http.get(url)
}
}
