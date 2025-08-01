import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment';
import { Observable } from 'rxjs';
import { Classroom } from '../../models/classroom';

@Injectable({
  providedIn: 'root'
})
export class ClasseroomService {


  constructor(private _http: HttpClient ) { }
    
    private apiUrl = `${environment.apiUrl}/classes`;

    getClassrooms() {
      return this._http.get<Classroom[]>(`${this.apiUrl}`);
    }

    addClassroom(classe: Classroom):Observable<Classroom>{
      return this._http.post<Classroom>(`${this.apiUrl}`, classe);
    }

    updateClassroom(id: number, classe: Classroom): Observable<Classroom>{
      return this._http.put<Classroom>(`${this.apiUrl}/${id}`, classe)
    }

    getclassroomById(id: number): Observable<Classroom>{
      return this._http.get<Classroom>(`${this.apiUrl}/${id}`)
    }

    deletclassroom(id: number){
      return this._http.delete(`${this.apiUrl}/${id}`)
    }





}