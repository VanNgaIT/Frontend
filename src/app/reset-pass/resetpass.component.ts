import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  standalone: true,
  styleUrls: ['./resetpass.component.css'],
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent, FooterComponent]
})
export class ResetPassComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  message: string = '';
  error: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Lấy token từ URL (do backend đã chuyển hướng)
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    // Nếu không có token, hiển thị lỗi (không cần kiểm tra token với backend)
    if (!this.token) {
      this.error = 'Không tìm thấy token trong URL!';
    }
  }

  // Gửi yêu cầu POST để thay đổi mật khẩu
  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.newPassword !== this.confirmPassword) {
      this.error = 'Mật khẩu và xác nhận mật khẩu không khớp!';
      return;
    }

    // Gửi yêu cầu đổi mật khẩu đến backend
    this.http.post(`http://localhost:8080/p-reset-password`, {
      token: this.token,
      newPassword: this.newPassword
    }).subscribe({
      next: (response: any) => {
        this.message = "Mật khẩu đã được thay đổi thành công!";
        this.error = '';
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = error.error || 'Đã xảy ra lỗi! Vui lòng thử lại.';
        this.message = '';
      }
    });
  }
}
