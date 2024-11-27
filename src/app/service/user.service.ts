import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users'; // Đảm bảo rằng bạn có URL API thích hợp

  constructor(private http: HttpClient) {}

  // Lấy thông tin người dùng
  getUserInfo(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Cập nhật thông tin người dùng
  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
}
