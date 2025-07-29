export interface Bulletin {
  eleve: {
    id: number;
    user: {
      nom: string;
      prenom: string;
    };
    classroom: {
      id: number;
      libelle: string;
    };
  };
  semestre: string;
  statistiques: {
    moyenne_generale: number;
    mention?: string;
  };
  details: {
    cour_id: number;
    matiere: string;
    note: number;
    coefficient: number;
    ponderee: number;
  }[];
}
