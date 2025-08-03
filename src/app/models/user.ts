export interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  date_naissance?: string;
  lieu?: string;
  sexe?: string;
  justificatif_path?: string;
  role: 'administrateur' | 'enseignant' | 'eleve_parent';

}


export interface Auth{
  token?: string;
  user : User;
}
