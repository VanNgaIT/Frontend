import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Doctor } from '../model/doctor.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class DoctorService {
    private apiUrl = 'http://localhost:8080/api/doctors'; // URL của API bác sĩ

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();  // Lấy token từ AuthService
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      }

  getAllDoctors(): Observable<Doctor[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<Doctor[]>(`${this.apiUrl}/all-doctor`, { headers });
     }
  getDoctorById(doctorId: number): Observable<Doctor> {
        const headers = this.getAuthHeaders();
        return this.http.get<Doctor>(`${this.apiUrl}/${doctorId}`, { headers });
      }
  
  createDoctors(doctor: Doctor): Observable<Doctor> {
        const headers = this.getAuthHeaders();
        return this.http.post<Doctor>(`${this.apiUrl}/create-doctor`, doctor, { headers });
      }
    
      // Cập nhật người dùng
      updateDoctors(id: number, doctor: Doctor): Observable<Doctor> {
        const headers = this.getAuthHeaders();
        return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor, { headers });
      }
    
      // Xóa người dùng
      deleteDoctors(id: number): Observable<void> {
        const headers = this.getAuthHeaders();
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
      }
}
