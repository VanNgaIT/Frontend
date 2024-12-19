import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';  // Import AuthService

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users'; // Đảm bảo rằng bạn có URL API thích hợp

  // Khởi tạo service UserService với HttpClient để thực hiện các yêu cầu HTTP và AuthService để lấy token xác thực.
  constructor(private http: HttpClient, private authService: AuthService) { }

  // Helper function to get the token and set the Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();  // Lấy token từ AuthService
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Lấy tất cả người dùng trả về mảng
  getAllUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(`${this.apiUrl}`, { headers });
  }

  // Lấy thông tin người dùng theo ID
  getUserById(id: number): Observable<User> { // tham số number
    const headers = this.getAuthHeaders();
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
  }
  
  // Tạo người dùng mới
  createUser(user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.post<User>(`${this.apiUrl}/create-user`, user, { headers });
  }

  // Cập nhật người dùng
  updateUser(id: number, user: User): Observable<User> {
    const headers = this.getAuthHeaders();
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  // Xóa người dùng
  deleteUser(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}
