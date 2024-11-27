import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  retypePassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    console.log("Email: ", this.email);
    console.log("Password: ", this.password);
    console.log("Retype Password: ", this.retypePassword);
    if (this.password !== this.retypePassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    this.authService.registerUser(this.email, this.password).subscribe(
      (response) => {
        alert('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error("Đăng ký thất bại", error);
        alert('Đăng ký thất bại: ' + error.message);
      }
    );
  }
}
