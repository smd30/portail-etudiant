// src/app/services/cour.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cour} from '../models/cour';



@Injectable({ providedIn: 'root' })
export class CourService {
  private apiUrl = 'http://localhost:8000/api/cours';

  constructor(private http: HttpClient) {}

  getCours(): Observable<Cour[]> {
    return this.http.get<Cour[]>(this.apiUrl);
  }

  getCour(id: number): Observable<Cour> {
    return this.http.get<Cour>(`${this.apiUrl}/${id}`);
  }

  createCour(cour: Partial<Cour>): Observable<Cour> {
    return this.http.post<Cour>(this.apiUrl, cour);
  }

  updateCour(id: number, cour: Partial<Cour>): Observable<Cour> {
    return this.http.put<Cour>(`${this.apiUrl}/${id}`, cour);
  }

  deleteCour(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
