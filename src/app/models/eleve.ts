import {Classroom} from './classroom';
import {User} from './user';

export interface Eleve {
  id: number;
  user_id: number;
  classroom_id: number;
  matricule: string;
  user?: User;
  classroom?: Classroom;
}
