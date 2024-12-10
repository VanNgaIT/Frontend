import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CommonModule } from '@angular/common';
import { Route, Router, RouterModule } from '@angular/router';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarAdminComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  email: string | null = null;

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
  }

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout(); // Đăng xuất
    this.email = null; // Đặt lại giá trị email sau khi đăng xuất
    localStorage.removeItem('email'); // Xóa email trong localStorage
    this.router.navigate(['/login']); // Chuyển hướng đến trang đăng nhập
  }
}
