import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import { AuthService } from '../../services/auth';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-layout',
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

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.role = localStorage.getItem('role');
    this.userName = localStorage.getItem('user_name');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
