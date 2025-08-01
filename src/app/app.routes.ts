// src/app/routes.ts
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { DashboardRedirect } from './pages/dashboard-redirect/dashboard-redirect';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { EnseignantDashboard } from './pages/enseignant-dashboard/enseignant-dashboard';
import { EleveDashboard } from './pages/eleve-dashboard/eleve-dashboard';
import { authGuard } from './guards/auth-guard';
import {LayoutComponent} from './pages/layout/layout';
import { UsersComponent } from './admin/users/users';
import { Classrooms } from './admin/classrooms/classrooms';
import { CoursComponent } from './admin/cours/cours';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardRedirect },  // redirige selon rôle
      { path: 'admin-dashboard', component: AdminDashboard },
      { path: 'enseignant-dashboard', component: EnseignantDashboard },
      { path: 'eleve-dashboard', component: EleveDashboard },
      { path: 'users', component: UsersComponent},
      { path: 'classes', component: Classrooms},
      { path: 'cours', component: CoursComponent},
    ],
  },

  { path: '**', redirectTo: '' },

];

