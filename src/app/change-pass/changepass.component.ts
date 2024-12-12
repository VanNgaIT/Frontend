import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { ChangePasswordService } from '../service/change-pass.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  imports: [FormsModule, RouterModule, CommonModule, HeaderComponent, FooterComponent], // Thêm CommonModule ở đây
  standalone: true,
  styleUrls: ['./changepass.component.css']
})
export class ChangePassComponent {
  email: string = '';
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';

  constructor(private authService: AuthService, private changePasswordService: ChangePasswordService, private router: Router) {}

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Mật khẩu mới và xác nhận mật khẩu không khớp.';
      return;
    }

    const changePasswordRequest = {
      email: this.email,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    };

    // Gọi service đổi mật khẩu
    this.changePasswordService.changePassword(changePasswordRequest).subscribe(
      response => {
        this.message = response.message; // Thông báo thành công
        // Bạn có thể điều hướng người dùng đến trang khác sau khi thay đổi mật khẩu
        this.router.navigate(['/profile']); 
      },
      error => {
        this.message = 'Lỗi trong quá trình thay đổi mật khẩu: ' + error.message;
      }
    );
  }
  
  onLogout() {
    this.authService.logout(); // Đăng xuất
    this.email = ''; // Đặt lại giá trị email sau khi đăng xuất
    localStorage.removeItem('email'); // Xóa email trong localStorage
    this.router.navigate(['/login']); // Chuyển hướng đến trang đăng nhập
  }
  
}
