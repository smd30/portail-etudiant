import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent, ConfirmModalComponent],
  templateUrl: './users.html',
  styleUrls: ['./users.css']
})

export class UsersComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  isModalOpen = false;
  isDeleteModalOpen = false;
  roleFilter = '';
  isLoading = false;
  errorMessage = '';

  // Formulaired
  formData: Partial<User> = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: '',
    sexe: '',
    role: 'administrateur',
    date_naissance: '',
    lieu: ''
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.filteredUsers = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des utilisateurs';
        this.isLoading = false;
        console.error();
      }
    });
  }

  applyFilter(): void {
    this.loadUsers();
  }

  openAddModal(): void {
    this.formData = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      adresse: '',
      sexe: '',
      role: 'administrateur',
      date_naissance: '',
      lieu: ''
    };
    this.selectedUser = null;
    this.isModalOpen = true;
  }

  openEditModal(user: User): void {
    this.selectedUser = user;
    this.formData = { ...user };
    this.isModalOpen = true;
  }

  openDeleteModal(user: User): void {
    this.selectedUser = user;
    this.isDeleteModalOpen = true;
  }

  submitForm(): void {
    if (this.selectedUser) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser(): void {
    this.isLoading = true;
    this.userService.addUser(this.formData as User).subscribe({
      next: (user) => {
        this.users.push(user);
        this.filteredUsers = [...this.users];
        this.isModalOpen = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la création';
        this.isLoading = false;
        console.error();
      }
    });
  }

  updateUser(): void {
    if (!this.selectedUser) return;

    this.isLoading = true;
    this.userService.updateUser(this.selectedUser.id, this.formData as User).subscribe({
      next: (user) => {
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
          this.users[index] = user;
          this.filteredUsers = [...this.users];
        }
        this.isModalOpen = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la mise à jour';
        this.isLoading = false;
        console.error();
      }
    });
  }

  deleteUser(): void {
    if (!this.selectedUser) return;

    this.isLoading = true;
    this.userService.deletUser(this.selectedUser.id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== this.selectedUser?.id);
        this.filteredUsers = [...this.users];
        this.isDeleteModalOpen = false;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors de la suppression';
        this.isLoading = false;
        console.error();
      }
    });
  }

  toggleEleveFields(): boolean {
    return this.formData.role === 'eleve_parent';
  }

  getRoleLabel(role: string): string {
    switch(role) {
      case 'administrateur': return 'Administrateur';
      case 'enseignant': return 'Enseignant';
      case 'eleve_parent': return 'Élève/Parent';
      default: return role;
    }
  }

}
