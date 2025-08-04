import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Eleve } from '../models/eleve';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EleveService {
  private apiUrl = 'http://localhost:8000/api/eleves'; // Adapter selon ton backend

  constructor(private http: HttpClient) {}

  getAll(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl);
  }

  getById(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.apiUrl}/${id}`);
  }

  create(data: FormData): Observable<Eleve> {
    return this.http.post<Eleve>(this.apiUrl, data);
  }


  update(id: number, data: FormData): Observable<Eleve> {
    return this.http.put<Eleve>(`${this.apiUrl}/${id}`, data);
  }



  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
