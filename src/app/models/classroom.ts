// src/app/models/classroom.ts
import { Cour } from './cour';

export interface Classroom {
  id: number;
  libelle: string;
  description?: string;
  cours?: Cour[];
}
