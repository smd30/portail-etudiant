import { User } from './user';

export interface Enseignant {
  id: number;
  user_id: number;
  user?: User;
}
