import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Params } from '../models/params.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private http: HttpClient) { }

  get(endpoint: string, params: Params[] | null = null): Observable<any> {
    let queryParams = new HttpParams();
    if (params) {
      params.forEach((p) => {
        queryParams = queryParams.append(p.key, p.value);
      });
    }

    return this.http.get(`${environment.apiUrl}/${endpoint}/`, { params: queryParams });
  }

  getById(endpoint: string, id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/${endpoint}/${id}/`);
  }

  add(endpoint: string, data: Object): Observable<any> {
    return this.http.post(`${environment.apiUrl}/${endpoint}/`, data);
  }

  update(endpoint: string, data: Object, id: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/${endpoint}/${id}/`, data);
  }

  delete(endpoint: string, id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/${endpoint}/${id}/`);
  }
}
