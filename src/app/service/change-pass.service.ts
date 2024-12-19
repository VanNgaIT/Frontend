import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  private apiUrl = 'http://localhost:8080/api/auth/changePassword'; 

  constructor(private http: HttpClient) {}

  changePassword(changePasswordRequest: { email: string, oldPassword: string, newPassword: string }): Observable<any> {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage

    // Nếu token tồn tại, thêm vào header Authorization
    const headers = token ? new HttpHeaders().set('Authorization', 'Bearer ' + token) : new HttpHeaders();

    return this.http.post(this.apiUrl, changePasswordRequest, { headers });
  }
}
