import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enseignant-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './enseignant-dashboard.html',
  styleUrls: ['./enseignant-dashboard.css']
})
export class EnseignantDashboard {
  userName = localStorage.getItem('user_name');
}
