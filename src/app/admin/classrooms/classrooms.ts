// src/app/admin/classrooms/classrooms.ts
import { Component, OnInit } from '@angular/core';
import { ClassroomService } from '../../services/classroom-service';
import { CourService } from '../../services/cour-service';
import { Classroom } from '../../models/classroom';
import { Cour } from '../../models/cour';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-classrooms',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ConfirmModalComponent],
  templateUrl: './classrooms.html',
  styleUrls: ['./classrooms.css'],
  providers: [ClassroomService, CourService]
})
export class ClassroomsComponent implements OnInit {
  classrooms: Classroom[] = [];
  cours: Cour[] = [];
  selectedClassroom: Classroom | null = null;
  isModalOpen = false;
  isDeleteModalOpen = false;
  isLoading = false;
  errorMessage = '';
  selectedCours: number[] = [];

  // Formulaire
  formData: Partial<Classroom> = {
    libelle: '',
    description: ''
  };

  constructor(
    private classroomService: ClassroomService,
    private courService: CourService
  ) {}

  ngOnInit(): void {
    this.loadClassrooms();
    this.loadCours();
  }

 loadClassrooms(): void {
  this.isLoading = true;
  this.classroomService.getClasses().subscribe({
    next: (classrooms: Classroom[]) => {
      // Pour chaque classe, charger les cours associés
      const requests = classrooms.map(classroom =>
        this.classroomService.getCoursByClasse(classroom.id).toPromise()
          .then(cours => {
            classroom.cours = cours;
            return classroom;
          })
      );

      Promise.all(requests).then(updatedClassrooms => {
        this.classrooms = updatedClassrooms;
        this.isLoading = false;
      });
    },
    error: (err: any) => {
      this.errorMessage = 'Erreur lors du chargement des classes';
      this.isLoading = false;
      console.error();
    }
  });
}

  loadCours(): void {
    this.courService.getCours().subscribe({
      next: (cours: Cour[]) => {
        this.cours = cours;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  openAddModal(): void {
    this.formData = {
      libelle: '',
      description: ''
    };
    this.selectedCours = [];
    this.selectedClassroom = null;
    this.isModalOpen = true;
  }

  openEditModal(classroom: Classroom): void {
    this.selectedClassroom = classroom;
    this.formData = { ...classroom };
    this.selectedCours = classroom.cours?.map(c => c.id) || [];
    this.isModalOpen = true;
  }

  openDeleteModal(classroom: Classroom): void {
    this.selectedClassroom = classroom;
    this.isDeleteModalOpen = true;
  }

  submitForm(): void {
    if (this.selectedClassroom) {
      this.updateClassroom();
    } else {
      this.createClassroom();
    }
  }
createClassroom(): void {
  this.isLoading = true;
  this.classroomService.createClasse(this.formData).subscribe({
    next: (classroom: Classroom) => {
      this.updateClassroomCours(classroom.id);
      // Ne pas ajouter directement à la liste, car loadClassrooms() sera appelé après
      this.isModalOpen = false;
      this.isLoading = false;
    },
    error: (err: any) => {
      this.errorMessage = 'Erreur lors de la création de la classe';
      this.isLoading = false;
      console.error();
    }
  });
}

updateClassroom(): void {
  if (!this.selectedClassroom) return;

  this.isLoading = true;
  this.classroomService.updateClasse(this.selectedClassroom.id, this.formData).subscribe({
    next: (classroom: Classroom) => {
      this.updateClassroomCours(classroom.id);
      // Ne pas mettre à jour directement, car loadClassrooms() sera appelé après
      this.isModalOpen = false;
      this.isLoading = false;
    },
    error: (err: any) => {
      this.errorMessage = 'Erreur lors de la mise à jour de la classe';
      this.isLoading = false;
      console.error();
    }
  });
}
updateClassroomCours(classroomId: number): void {
  // D'abord récupérer les cours actuels
  this.classroomService.getCoursByClasse(classroomId).subscribe({
    next: (currentCours: any[]) => {
      const currentIds = currentCours.map(c => c.id);

      // Cours à ajouter
      const toAdd = this.selectedCours.filter(id => !currentIds.includes(id));
      // Cours à supprimer
      const toRemove = currentIds.filter(id => !this.selectedCours.includes(id));

      // Déclarer operations avec un type explicite
      const operations: Promise<any>[] = [];

      // Ajouter les nouveaux cours
      toAdd.forEach(courId => {
        operations.push(
          this.classroomService.attachCour(classroomId, courId).toPromise()
        );
      });

      // Supprimer les cours désélectionnés
      toRemove.forEach(courId => {
        operations.push(
          this.classroomService.detachCour(classroomId, courId).toPromise()
        );
      });

      // Attendre que toutes les opérations soient terminées
      Promise.all(operations).then(() => {
        // Recharger les classes pour afficher les changements
        this.loadClassrooms();
      }).catch(error => {
        console.error(error);
        this.errorMessage = 'Erreur lors de la mise à jour des cours associés';
      });
    },
    error: (err) => {
      console.error(err);
      this.errorMessage = 'Erreur lors de la récupération des cours associés';
    }
  });
}

  deleteClassroom(): void {
    if (!this.selectedClassroom) return;

    this.isLoading = true;
    this.classroomService.deleteClasse(this.selectedClassroom.id).subscribe({
      next: () => {
        this.classrooms = this.classrooms.filter(c => c.id !== this.selectedClassroom?.id);
        this.isDeleteModalOpen = false;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Erreur lors de la suppression de la classe';
        this.isLoading = false;
        console.error();
      }
    });
  }
}
