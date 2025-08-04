import { Component, OnInit } from '@angular/core';
import { EleveService } from '../../services/eleve-service';
import { ClassroomService } from '../../services/classroom-service';
import { Eleve } from '../../models/eleve';
import { Classroom } from '../../models/classroom';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-eleves',
  standalone: true,
  templateUrl: './eleves.html',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgForOf
  ],
  styleUrls: ['./eleves.css']
})
export class Eleves implements OnInit {
  eleves: Eleve[] = [];
  classes: Classroom[] = [];
  formEleve!: FormGroup;
  isEditMode = false;
  selectedEleveId: number | null = null;
  justificatifFile?: File;
  modalInstance: bootstrap.Modal | null = null;

  constructor(
    private eleveService: EleveService,
    private classroomService: ClassroomService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadEleves();
    this.loadClasses();

    const modalElement = document.getElementById('modalAddEditEleve');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  initForm() {
    this.formEleve = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      addresse: ['', Validators.required],
      date_naissance: ['', Validators.required],
      lieu: ['', Validators.required],
      sexe: ['M', Validators.required],
      classroom_id: ['', Validators.required],
      justificatif: [null]
    });
  }

  loadEleves() {
    this.eleveService.getAll().subscribe({
      next: (data: Eleve[]) => this.eleves = data,
      error: (err: any) => console.error('Erreur chargement élèves', err)
    });
  }

  loadClasses() {
    this.classroomService.getClasses().subscribe({
      next: (data: Classroom[]) => this.classes = data,
      error: (err: any) => console.error('Erreur chargement classes', err)
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.justificatifFile = event.target.files[0];
    }
  }

  openAddModal() {
    this.isEditMode = false;
    this.selectedEleveId = null;
    this.formEleve.reset({ sexe: 'M' });
    this.justificatifFile = undefined;
    this.modalInstance?.show();
  }

  openEditModal(eleve: Eleve) {
    this.isEditMode = true;
    this.selectedEleveId = eleve.id;

    this.formEleve.patchValue({
      nom: eleve.user?.nom,
      prenom: eleve.user?.prenom,
      email: eleve.user?.email,
      telephone: eleve.user?.telephone,
      addresse: eleve.user?.addresse,
      date_naissance: eleve.user?.date_naissance, // <-- corrigé ici
      lieu: eleve.user?.lieu,
      sexe: eleve.user?.sexe,
      classroom_id: eleve.classroom_id
    });

    this.justificatifFile = undefined;
    this.modalInstance?.show();
  }

  submit() {
    if (this.formEleve.invalid) return;

    const formData = new FormData();
    Object.entries(this.formEleve.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (this.justificatifFile) {
      formData.append('justificatif', this.justificatifFile);
    }

    const closeModal = () => this.modalInstance?.hide();

    if (this.isEditMode && this.selectedEleveId !== null) {
      this.eleveService.update(this.selectedEleveId, formData).subscribe({
        next: () => {
          this.loadEleves();
          closeModal();
        },
        error: (err: any) => console.error('Erreur modification', err)
      });
    } else {
      this.eleveService.create(formData).subscribe({
        next: () => {
          this.loadEleves();
          closeModal();
        },
        error: (err: any) => {
          console.error('Erreur modification', err);
          if (err.error && err.error.errors) {
            console.error('Détails validation:', err.error.errors);
          }
        }
      });
    }

  }

  deleteEleve(id: number) {
    if (confirm('Voulez-vous vraiment supprimer cet élève ?')) {
      this.eleveService.delete(id).subscribe({
        next: () => this.loadEleves(),
        error: (err: any) => console.error('Erreur suppression', err)
      });
    }
  }
}
