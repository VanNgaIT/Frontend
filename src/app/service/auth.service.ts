import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlRegister = 'http://localhost:8080/api/auth/register';
  private apiUrlLogin = 'http://localhost:8080/api/auth/login';


  constructor(private http: HttpClient) { }

  registerUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.apiUrlRegister, body);
  }
  loginUser(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(this.apiUrlLogin, body);  }
  isAuthenticated(): boolean {
      return !!localStorage.getItem('auth_token');
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
  logout(): void {
      localStorage.removeItem('auth_token');
    }
  // Lưu thông tin người dùng vào localStorage
  saveUserToLocalStorage(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
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
