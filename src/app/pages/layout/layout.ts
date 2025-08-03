import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../../services/auth';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone:true,
  templateUrl: './layout.html',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink
  ],
  styleUrls: ['./layout.css']
})
export class LayoutComponent {

  role: string | null = null;
  userName: string | null = null;
  dashboardRoute: string = '/dashboard'; // fallback

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.userName = localStorage.getItem('user_name');
    this.role = localStorage.getItem('role');

    switch (this.role) {
      case 'administrateur':
        this.dashboardRoute = '/admin-dashboard';
        break;
      case 'enseignant':
        this.dashboardRoute = '/enseignant-dashboard';
        break;
      case 'eleve_parent':
        this.dashboardRoute = '/eleve-dashboard';
        break;
      default:
        this.dashboardRoute = '/login';
        break;
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  }



