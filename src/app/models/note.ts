export interface Note {
  id?: number;
  eleve_id: number;
  cour_id: number;
  classroom_id?: number;
  enseignant_id?: number;
  note: number;
  type_note: 'devoir' | 'composition' | 'examen';
  coefficient: number;
  semestre: string;
  date_evaluation: string;
  commentaire?: string;
}
