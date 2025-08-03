// src/app/models/enseignant.ts
import { User } from './user';

export interface Enseignant {
  id: number;
  user_id: number;
  user: User;
  coursClassrooms?: { cours: string; classe: string }[];
}
