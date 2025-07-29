import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Eleve} from '../models/eleve';



@Injectable({
  providedIn: 'root'
})
export class EleveService {

  private apiUrl = 'http://localhost:8000/api/eleves';

  constructor(private http: HttpClient) {}

  getEleves(): Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.apiUrl);
  }

  getEleve(id: number): Observable<Eleve> {
    return this.http.get<Eleve>(`${this.apiUrl}/${id}`);
  }

  createEleve(eleve: Partial<Eleve>): Observable<Eleve> {
    return this.http.post<Eleve>(this.apiUrl, eleve);
  }

  updateEleve(id: number, eleve: Partial<Eleve>): Observable<Eleve> {
    return this.http.put<Eleve>(`${this.apiUrl}/${id}`, eleve);
  }

  deleteEleve(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


}
