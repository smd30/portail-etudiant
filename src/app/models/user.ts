export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  addresse?: string;
  date_naissane?: string;
  lieu?: string;
  sexe?: string;
  justificatif_path?: string;
  role: 'administrateur' | 'enseignant' | 'eleve_parent';
  created_at?: string;
  updated_at?: string;
}


export interface Auth{
  token?: string;
  user : User;
}