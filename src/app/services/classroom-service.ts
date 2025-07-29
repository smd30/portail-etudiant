// src/app/services/classe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Classroom} from '../models/classroom';



@Injectable({ providedIn: 'root' })
export class ClassroomService {
  private apiUrl = 'http://localhost:8000/api/classes';

  constructor(private http: HttpClient) {}

  getClasses(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(this.apiUrl);
  }

  getClasse(id: number): Observable<Classroom> {
    return this.http.get<Classroom>(`${this.apiUrl}/${id}`);
  }

  createClasse(classe: Partial<Classroom>): Observable<Classroom> {
    return this.http.post<Classroom>(this.apiUrl, classe);
  }

  updateClasse(id: number, classe: Partial<Classroom>): Observable<Classroom> {
    return this.http.put<Classroom>(`${this.apiUrl}/${id}`, classe);
  }

  deleteClasse(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ Cours liés à une classe
  getCoursByClasse(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/cours`);
  }

  // ✅ Lier un cours à une classe
  attachCour(classroomId: number, courId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${classroomId}/cours/attach`, { cour_id: courId });
  }

  // ✅ Détacher un cours d’une classe
  detachCour(classroomId: number, courId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${classroomId}/cours/detach`, { cour_id: courId });
  }
}
