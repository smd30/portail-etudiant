import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-eleve-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eleve-dashboard.html',
  styleUrls: ['./eleve-dashboard.css']
})
export class EleveDashboard {
  userName = localStorage.getItem('user_name');
}
