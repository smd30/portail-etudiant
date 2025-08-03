// src/app/services/enseignant.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Enseignant } from '../models/enseignant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnseignantService {
  private apiUrl = 'http://localhost:8000/api/enseignants'; // adapte selon ton backend

  constructor(private http: HttpClient) {}

  getEnseignants(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(this.apiUrl);
  }

  createEnseignant(data: Partial<Enseignant>): Observable<Enseignant> {
    return this.http.post<Enseignant>(this.apiUrl, data);
  }

  updateEnseignant(id: number, data: Partial<Enseignant>): Observable<Enseignant> {
    return this.http.put<Enseignant>(`${this.apiUrl}/${id}`, data);
  }

  deleteEnseignant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
