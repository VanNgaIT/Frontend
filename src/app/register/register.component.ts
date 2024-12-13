import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent,RouterModule, FooterComponent, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  retypePassword: string = '';

  userName: string ='';
  genDer: boolean = true;
  address: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    console.log("Email: ", this.email);
    console.log("Password: ", this.password);
    console.log("Retype Password: ", this.retypePassword);

    console.log("Username: ", this.userName);
    console.log("Gender: ", this.genDer);
    console.log("Address: ", this.address);
    if (this.password !== this.retypePassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    this.authService.registerUser(this.email, this.password, this.retypePassword, this.userName, this.genDer, this.address).subscribe(
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
