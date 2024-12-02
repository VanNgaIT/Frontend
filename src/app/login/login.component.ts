import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, HeaderComponent, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.loginUser(this.email, this.password).subscribe(
      (token) => {
        if (token) {
          console.log('Login response:', token);
          localStorage.setItem('token', token);
  
          // Lưu thông tin người dùng vào localStorage ngay sau khi đăng nhập thành công
          this.authService.saveUserToLocalStorage({ email: this.email }, token);
  
          // Chuyển hướng đến trang home
          this.router.navigate(['/home']);
        } else {
          console.error('Token is null or undefined!');
          alert('Token không hợp lệ!');
        }
      },
      (error) => {
        console.error('Login error:', error);
        alert('Đăng nhập thất bại: ' + error.message);
      }
    );
  }
}
