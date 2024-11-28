import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users'; // Đảm bảo rằng bạn có URL API thích hợp
  private getUserDetailAPIURL = 'http://localhost:8080/api/users/me';

  constructor(private http: HttpClient) {}

  // Lấy thông tin người dùng
  getUserInfo(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Lấy thông tin người dùng
  getUserDetails(): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`, // Token JWT nếu cần
    });
    return this.http.get<any>(this.getUserDetailAPIURL, { headers });
  }

  getUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  updateUserDetails(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`,
    });
    return this.http.put<User>(this.getUserDetailAPIURL, user, { headers });
  }
}
