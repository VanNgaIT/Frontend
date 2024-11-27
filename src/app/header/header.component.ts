import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user: any;

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalStorage();
  }

  constructor(private authService: AuthService) {}

  onLogout() {
    this.authService.removeUserFromLocalStorage();
    this.user = null;  // Reset user information after logout
  }
}
