import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from '../header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  imports: [FormsModule, RouterModule, HeaderComponent, FooterComponent],
  standalone: true,
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotPassComponent {
  // Biến dùng cho form quên mật khẩu
  email: string = '';
  message: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(event: Event) {
    // Gửi yêu cầu dưới dạng query parameter thay vì body
    event.preventDefault();
    const url = `http://localhost:8080/api/resetpass/password-reset?email=${encodeURIComponent(this.email)}`;
    
    this.http.post(url, {}).subscribe({
      next: (response: any) => {
        this.message = response;
        this.error = '';
      },
      error: (error) => {
        this.error = error.error;
        this.message = '';
      }
    });
  }

  
}
