// src/app/pages/dashboard-redirect/dashboard-redirect.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-redirect',
  standalone: true,
  template: '',
})
export class DashboardRedirect implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    console.log('Role trouvé :', role);

    switch (role) {
      case 'administrateur':
        this.router.navigate(['/admin-dashboard']);
        break;
      case 'enseignant':
        this.router.navigate(['/enseignant-dashboard']);
        break;
      case 'eleve_parent':
        this.router.navigate(['/eleve-dashboard']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}
