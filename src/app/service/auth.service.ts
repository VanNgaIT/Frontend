import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlRegister = 'http://localhost:8080/api/auth/register';
  private apiUrlLogin = 'http://localhost:8080/api/auth/login';
  private apiUrl = 'http://localhost:8080/api';


  constructor(private http: HttpClient) { }

  registerUser(email: string, password: string, retypePassword: string): Observable<any> {
    const body = { email, password, retypePassword};
    return this.http.post(this.apiUrlRegister, body, { responseType: 'text' }) ;
  }
  loginUser(email: string, password: string) {
    const body = { email, password };
    return this.http.post<string>('http://localhost:8080/api/auth/login', body, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      responseType: 'text' as 'json'  // Đảm bảo Angular nhận phản hồi dưới dạng text
    }).pipe(
      tap(token => {
        if (token) {
          localStorage.setItem('token', token); // Lưu token
          localStorage.setItem('email', email);
        }
      })
    );
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  
    // Lưu token vào localStorage sau khi đăng nhập thành công
  setToken(token: string): void {
      localStorage.setItem('auth_token', token);
    }
  
    // Lấy token từ localStorage
  getToken(): string | null {
      return localStorage.getItem('auth_token');
    }
  
    // Thoát đăng nhập
    logout() {
      localStorage.removeItem('token');
  localStorage.removeItem('email'); // Xóa email trong localStorage khi đăng xuất
  localStorage.removeItem('user');
    }
  // Lưu thông tin người dùng vào localStorage
  saveUserToLocalStorage(user: any, token: string) {
    localStorage.setItem('token', token); // Lưu token
    localStorage.setItem('user', JSON.stringify(user)); // Lưu thông tin người dùng
  }

  // Lấy thông tin người dùng từ localStorage
  getUserFromLocalStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Xóa thông tin người dùng khỏi localStorage khi đăng xuất
  removeUserFromLocalStorage(): void {
    localStorage.removeItem('user');
  }

  getUserRole(): string | null {
    const user = this.getUserFromLocalStorage();
    return user ? user.role : null;
  }
}
