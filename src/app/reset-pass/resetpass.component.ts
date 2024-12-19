import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';

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

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) {}

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
      Swal.fire({
                title: 'Lỗi',
                text:'Mật khẩu và xác nhận mật khẩu không khớp',
                icon: 'error',
                confirmButtonText: 'OK',
                })
      return;
    }


    this.http.post(`http://localhost:8080/p-reset-password`, {
      token: this.token,
      newPassword: this.newPassword
    }).subscribe({
      next: (response: any) => {
        Swal.fire({
          title: 'Lỗi',
          text:'Mật khẩu thay đổi thành công',
          icon: 'success',
          confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/home']);
             } 
            })
      },
      error: (error) => {
        console.error('Error:', error);
        this.error = error.error || 'Đã xảy ra lỗi! Vui lòng thử lại.';
        this.message = '';
      }
    });
  }
}
