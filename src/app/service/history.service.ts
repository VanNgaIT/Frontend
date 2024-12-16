// schedule.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Histories } from '../model/history.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl = 'http://localhost:8080/api/histories'; // Đường dẫn API để lấy danh sách lịch trình

  constructor(private http: HttpClient, private authService: AuthService) { }

   private getAuthHeaders(): HttpHeaders {
          const token = this.authService.getToken();  // Lấy token từ AuthService
          return new HttpHeaders().set('Authorization', `Bearer ${token}`);
        }

  getAllHistorys(): Observable<Histories[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<Histories[]>(`${this.apiUrl}`, { headers });
    }
  
    // Lấy thông tin người dùng theo ID
    getHistoryById(id: number): Observable<Histories> {
      const headers = this.getAuthHeaders();
      return this.http.get<Histories>(`${this.apiUrl}/${id}`, { headers });
    }

    // Tạo người dùng mới
    createHistory(history: Histories): Observable<Histories> {
      const headers = this.getAuthHeaders();
      return this.http.post<Histories>(`${this.apiUrl}/create-history`, history, { headers });
    }
  
    // Cập nhật người dùng
    updateHistory(id: number, history: History): Observable<Histories> {
      const headers = this.getAuthHeaders();
      return this.http.put<Histories>(`${this.apiUrl}/${id}`, history, { headers });
    }
  
    // Xóa người dùng
    deleteHistory(id: number): Observable<void> {
      const headers = this.getAuthHeaders();
      return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
}
