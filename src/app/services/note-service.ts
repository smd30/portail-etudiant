import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note'; // Assure-toi que ce chemin est correct

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:8000/api/notes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl);
  }

  getById(id: number): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  create(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note);
  }

  update(id: number, note: Note): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, note);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
