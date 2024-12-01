import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service'; // Giả sử bạn có AuthService để quản lý token

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private apiUrl = 'http://localhost:8080/api/specialties';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSpecialties(): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      console.error('No token available');
      return throwError('Token không có, vui lòng đăng nhập lại.');
    }
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get(this.apiUrl, { headers });
  }
  
}
