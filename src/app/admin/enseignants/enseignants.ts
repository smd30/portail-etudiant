// src/app/admin/enseignant/enseignant.component.ts
import { Component, OnInit } from '@angular/core';
import { Enseignant } from '../../models/enseignant';
import { EnseignantService } from '../../services/enseignant.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enseignant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enseignants.html',
  styleUrls: ['./enseignants.css']
})
export class Enseignants implements OnInit {
  enseignants: Enseignant[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  // Modal gestion
  isModalOpen = false;
  isDeleteModalOpen = false;
  selectedEnseignant: Enseignant | null = null;

  // Formulaire
  formData: Partial<Enseignant & {user: any}> = {
    user: {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      addresse: '',
      date_naissance: '',
      lieu: '',
      sexe: 'M'
    },
    coursClassrooms: []
  };

  constructor(private enseignantService: EnseignantService) {}

  ngOnInit(): void {
    this.loadEnseignants();
  }

  loadEnseignants() {
    this.isLoading = true;
    this.enseignantService.getEnseignants().subscribe({
      next: (data) => {
        this.enseignants = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des enseignants';
        this.isLoading = false;
      }
    });
  }

  openAddModal() {
    this.resetForm();
    this.isModalOpen = true;
  }

  openEditModal(enseignant: Enseignant) {
    this.selectedEnseignant = enseignant;
    this.formData = {
      ...enseignant,
      user: {...enseignant.user}
    };
    this.isModalOpen = true;
  }

  resetForm() {
    this.selectedEnseignant = null;
    this.formData = {
      user: {
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        addresse: '',
        date_naissance: '',
        lieu: '',
        sexe: 'M'
      },
      coursClassrooms: []
    };
  }

  submitForm() {
    if (this.selectedEnseignant) {
      // update
      this.enseignantService.updateEnseignant(this.selectedEnseignant.id, this.formData).subscribe({
        next: (updated) => {
          const idx = this.enseignants.findIndex(e => e.id === updated.id);
          if (idx > -1) this.enseignants[idx] = updated;
          this.successMessage = 'Enseignant modifié avec succès';
          this.isModalOpen = false;
        },
        error: () => this.errorMessage = 'Erreur lors de la mise à jour'
      });
    } else {
      // create
      this.enseignantService.createEnseignant(this.formData).subscribe({
        next: (created) => {
          this.enseignants.push(created);
          this.successMessage = 'Enseignant ajouté avec succès';
          this.isModalOpen = false;
        },
        error: () => this.errorMessage = 'Erreur lors de la création'
      });
    }
  }

  confirmDelete(enseignant: Enseignant) {
    this.selectedEnseignant = enseignant;
    this.isDeleteModalOpen = true;
  }

  deleteEnseignant() {
    if (!this.selectedEnseignant) return;
    this.enseignantService.deleteEnseignant(this.selectedEnseignant.id).subscribe({
      next: () => {
        this.enseignants = this.enseignants.filter(e => e.id !== this.selectedEnseignant!.id);
        this.successMessage = 'Enseignant supprimé avec succès';
        this.isDeleteModalOpen = false;
      },
      error: () => this.errorMessage = 'Erreur lors de la suppression'
    });
  }

  cancelDelete() {
    this.isDeleteModalOpen = false;
    this.selectedEnseignant = null;
  }
}
