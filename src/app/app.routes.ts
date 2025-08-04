// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { DashboardRedirect } from './pages/dashboard-redirect/dashboard-redirect';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { EnseignantDashboard } from './pages/enseignant-dashboard/enseignant-dashboard';
import { EleveDashboard } from './pages/eleve-dashboard/eleve-dashboard';
import { LayoutComponent } from './pages/layout/layout';
import { authGuard } from './guards/auth-guard';
import { UsersComponent } from './admin/users/users';
import { ClassroomsComponent } from './admin/classrooms/classrooms';
import { CoursComponent } from './admin/cours/cours';
import {Bulletins} from './admin/bulletins/bulletins';
import {Enseignants} from './admin/enseignants/enseignants';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: DashboardRedirect },
      { path: 'admin-dashboard', component: AdminDashboard },
      { path: 'enseignant-dashboard', component: EnseignantDashboard },
      { path: 'eleve-dashboard', component: EleveDashboard },
      { path: 'users', component: UsersComponent },
      { path: 'classes', component: ClassroomsComponent },
      { path: 'cours', component: CoursComponent },
      {
        path: 'eleves',
        loadComponent: () => import('./admin/eleves/eleves').then(m => m.Eleves)
      },
      { path: 'enseignants', component: Enseignants },
      { path: 'bulletins', component: Bulletins },
    ],
  },

  { path: '**', redirectTo: '' },
];
