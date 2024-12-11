import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Giả sử service này có phương thức để lấy vai trò của người dùng hiện tại
    const role = this.authService.getUserRole();
    
    // Kiểm tra nếu role của người dùng là admin
    this.isAdmin = role === 'admin';
  }

  // Các hàm xử lý cho thêm, sửa, xóa
  onAdd(): void {
    console.log('Thêm mới dữ liệu');
    // Thêm logic cho chức năng thêm
  }

  onEdit(): void {
    console.log('Sửa dữ liệu');
    // Thêm logic cho chức năng sửa
  }

  onDelete(): void {
    console.log('Xóa dữ liệu');
    // Thêm logic cho chức năng xóa
  }

  logout() : void {
    this.authService.logout();
  }
}
