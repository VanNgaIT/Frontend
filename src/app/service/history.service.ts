// schedule.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Histories } from '../model/history.model';
import { Doctor } from '../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private apiUrl = 'http://localhost:8080/api/histories'; // Đường dẫn API để lấy danh sách lịch trình
  private apiUrlDoctor = 'http://localhost:8080/api/doctors'

  constructor(private http: HttpClient, private authService: AuthService) { }

    private getAuthHeaders(): HttpHeaders {
      const token = this.authService.getToken();  // Lấy token từ AuthService
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
  
    getDoctorByUserId(): Observable<Doctor> {
      const headers = this.getAuthHeaders();
      return this.http.get<Doctor>(`${this.apiUrlDoctor}/doctor/user`, { headers });
    }

    getDoctorId(userId: number): Observable<number> {
      const headers = this.getAuthHeaders();
      return this.http.get<number>(`${this.apiUrlDoctor}/get-doctor-id/${userId}`, { headers });
    }

    getAllHistorys(doctorId: number): Observable<Histories[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<Histories[]>(`${this.apiUrl}/all-history/doctor/${doctorId}`, { headers });
    }
    
    findHistoryByUserId(userId: number):Observable<Histories>{
      const headers = this.getAuthHeaders();
      return this.http.get<Histories>(`${this.apiUrl}/history/user/${userId}`, { headers });
    }

    getHistoryById(id: number): Observable<Histories> {
      const headers = this.getAuthHeaders();
      // Gọi API chỉ cần id của hồ sơ bệnh án
      return this.http.get<Histories>(`${this.apiUrl}/history/${id}`, { headers });
    }

    createHistory(userId: number, history: Histories): Observable<Histories> {
      const headers = this.getAuthHeaders();
      return this.http.post<Histories>(`${this.apiUrl}/create-history/${userId}`, history, { headers });
    }
  
    updateHistory(id: number, history: Histories): Observable<Histories> {
      const headers = this.getAuthHeaders();
      return this.http.put<Histories>(`${this.apiUrl}/history/${id}`, history, { headers });
    }
    deleteHistory(id: number): Observable<void> {
      const headers = this.getAuthHeaders();
      return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
}
