import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bulletin } from '../models/bulletin';
import { Note } from '../models/note';

@Injectable({
  providedIn: 'root'
})
export class BulletinService {
  private baseUrl = 'http://localhost:8000/api/bulletins';

  constructor(private http: HttpClient) {}

  /**
   * Liste des bulletins avec filtre ?classe=1&semestre=Semestre 1
   */
  getBulletins(classeId: number | null, semestre: string): Observable<Bulletin[]> {
    const params = new HttpParams()
      .set('classe', classeId ? classeId.toString() : '')
      .set('semestre', semestre);

    return this.http.get<Bulletin[]>(this.baseUrl, { params });
  }

  /**
   * Bulletin d’un élève spécifique pour un semestre
   */
  getBulletinByEleve(eleveId: number, semestre: string): Observable<Bulletin> {
    return this.http.get<Bulletin>(`${this.baseUrl}/${eleveId}/${semestre}`);
  }

  /**
   * Enregistrer une note via l’API bulletin
   */
  storeNote(data: {
    eleve_id: number;
    cour_id: number;
    note: number;
    type_note: 'devoir' | 'composition' | 'examen';
    coefficient: number;
    semestre: string;
    date_evaluation: string;
    commentaire?: string;
  }): Observable<Note> {
    return this.http.post<Note>(`${this.baseUrl}/note`, data);
  }

  /**
   * Mise à jour d’une note
   */
  updateNote(id: number, data: {
    note: number;
    type_note?: 'devoir' | 'composition' | 'examen';
  }): Observable<Note> {
    return this.http.put<Note>(`${this.baseUrl}/note/${id}`, data);
  }

  /**
   * Télécharger le bulletin PDF
   */
  downloadPdf(eleveId: number, semestre: string): Observable<Blob> {
    return this.http.get(`http://localhost:8000/api/bulletins/${eleveId}/${semestre}/download`, {
      responseType: 'blob'
    });
  }
}
