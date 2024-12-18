import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { AuthService } from './auth.service';  // Import AuthService
import { Histories } from '../model/history.model';

@Injectable({
  providedIn: 'root'
})
export class UserHistoryService {

  private apiUrl = 'http://localhost:8080/api/histories'; // Đảm bảo rằng bạn có URL API thích hợp
  private apiUrlRating = 'http://localhost:8080/api/ratings'

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Helper function to get the token and set the Authorization header
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();  // Lấy token từ AuthService
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Lấy tất cả người dùng
  getHistoriesByUserId(): Observable<Histories[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Histories[]>(`${this.apiUrl}/history/user`, { headers });
  }

  saveRatings(histories: Histories[]): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/save`, histories, { headers });
}
  
}
