export interface Eleve {
  id: number;
  user_id: number;
  classroom_id: number;
  matricule: string;
  user?: {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    telephone: string;
    addresse: string;
    date_naissance: string;
    lieu: string;
    sexe: 'M' | 'F';
    justificatif_path?: string;
  };
  classroom?: {
    id: number;
    libelle: string;
  };
}
