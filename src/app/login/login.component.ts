import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import Swal from 'sweetalert2';


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
      () => {
        const token = localStorage.getItem('token'); // Lấy token từ localStorage
        if (token) {
          console.log(token);

          this.router.navigate(['/home']);
        } else {
          console.error('Token không có trong localStorage');
        }
      },
      (error) => {
        console.error('Login error:', error);
        Swal.fire({
            title: 'Đăng nhập thất bại',
            text: 'Email hoặc mật khẩu sai',
            icon: 'error',
            confirmButtonText: 'OK',
            })
      }
    );
  }
}
