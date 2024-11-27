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
      (response) => {
        // Giả sử response trả về chứa token
        this.authService.saveUserToLocalStorage(response); 
        this.router.navigate(['/home']);  // Chuyển hướng đến trang chủ
      },
      (error) => {
        alert('Đăng nhập thất bại: ' + error.message);
      }
    );
  }
}
