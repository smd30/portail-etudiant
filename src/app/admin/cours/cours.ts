// src/app/admin/cours/cours.ts
import { Component, OnInit } from '@angular/core';
import { CourService } from '../../services/cour-service'; // Correction du chemin
import { Cour } from '../../models/cour';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ConfirmModalComponent],
  templateUrl: './cours.html',
  styleUrls: ['./cours.css'],
  providers: [CourService] // Ajout du provider
})
export class CoursComponent implements OnInit {
  cours: Cour[] = [];
  filteredCours: Cour[] = [];
  selectedCour: Cour | null = null;
  isModalOpen = false;
  isDeleteModalOpen = false;
  isLoading = false;
  errorMessage = '';

  // Formulaire
  formData: Partial<Cour> = {
    libelle: '',
    credit: 0,
    volume: 0,
    semestre: ''
  };

  constructor(private courService: CourService) {}

  ngOnInit(): void {
    this.loadCours();
  }

  loadCours(): void {
    this.isLoading = true;
    this.courService.getCours().subscribe({
      next: (cours: Cour[]) => { // Ajout du type
        this.cours = cours;
        this.filteredCours = cours;
        this.isLoading = false;
      },
      error: (err: any) => { // Ajout du type
        this.errorMessage = 'Erreur lors du chargement des cours';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  openAddModal(): void {
    this.formData = {
      libelle: '',
      credit: 0,
      volume: 0,
      semestre: ''
    };
    this.selectedCour = null;
    this.isModalOpen = true;
  }

  openEditModal(cour: Cour): void {
    this.selectedCour = cour;
    this.formData = { ...cour };
    this.isModalOpen = true;
  }

  openDeleteModal(cour: Cour): void {
    this.selectedCour = cour;
    this.isDeleteModalOpen = true;
  }

  submitForm(): void {
    if (this.selectedCour) {
      this.updateCour();
    } else {
      this.createCour();
    }
  }

  createCour(): void {
    this.isLoading = true;
    this.courService.createCour(this.formData).subscribe({
      next: (cour: Cour) => { // Ajout du type
        this.cours.push(cour);
        this.filteredCours = [...this.cours];
        this.isModalOpen = false;
        this.isLoading = false;
      },
      error: (err: any) => { // Ajout du type
        this.errorMessage = 'Erreur lors de la création du cours';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  updateCour(): void {
    if (!this.selectedCour) return;

    this.isLoading = true;
    this.courService.updateCour(this.selectedCour.id, this.formData).subscribe({
      next: (cour: Cour) => { // Ajout du type
        const index = this.cours.findIndex(c => c.id === cour.id);
        if (index !== -1) {
          this.cours[index] = cour;
          this.filteredCours = [...this.cours];
        }
        this.isModalOpen = false;
        this.isLoading = false;
      },
      error: (err: any) => { // Ajout du type
        this.errorMessage = 'Erreur lors de la mise à jour du cours';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  deleteCour(): void {
    if (!this.selectedCour) return;

    this.isLoading = true;
    this.courService.deleteCour(this.selectedCour.id).subscribe({
      next: () => {
        this.cours = this.cours.filter(c => c.id !== this.selectedCour?.id);
        this.filteredCours = [...this.cours];
        this.isDeleteModalOpen = false;
        this.isLoading = false;
      },
      error: (err: any) => { // Ajout du type
        this.errorMessage = 'Erreur lors de la suppression du cours';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}