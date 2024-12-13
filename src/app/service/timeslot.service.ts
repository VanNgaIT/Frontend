import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TimeSlot } from '../model/timeslot.model';
import { Doctor } from '../model/doctor.model';
import { AuthService } from './auth.service'; // Giả sử bạn có AuthService để quản lý token

@Injectable({
  providedIn: 'root'
})
export class TimeSlotService {

  private apiUrl = 'http://localhost:8080/api/time-slots';

  constructor(private http: HttpClient, private authService: AuthService) { }

    private getAuthHeaders(): HttpHeaders {
      const token = this.authService.getToken();  // Lấy token từ AuthService
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
   
    // Lấy tất cả người dùng
    getAllTimeSlots(): Observable<TimeSlot[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<TimeSlot[]>(`${this.apiUrl}`, { headers });
    }
  
    // Lấy thông tin người dùng theo ID
    getTimeSlotsById(id: number): Observable<TimeSlot> {
      const headers = this.getAuthHeaders();
      return this.http.get<TimeSlot>(`${this.apiUrl}/${id}`, { headers });
    }

    // Tạo người dùng mới
    createTimeSlots(timeslot: TimeSlot): Observable<TimeSlot> {
      const headers = this.getAuthHeaders();
      return this.http.post<TimeSlot>(`${this.apiUrl}/create-timeslot`, timeslot, { headers });
    }
  
    // Cập nhật người dùng
    updateTimeSlots(id: number, timeslot: TimeSlot): Observable<TimeSlot> {
      const headers = this.getAuthHeaders();
      return this.http.put<TimeSlot>(`${this.apiUrl}/${id}`, timeslot, { headers });
    }
  
    // Xóa người dùng
    deleteTimeSlots(id: number): Observable<void> {
      const headers = this.getAuthHeaders();
      return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
  
}
