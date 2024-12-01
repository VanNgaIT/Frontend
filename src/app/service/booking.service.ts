import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Giả sử bạn có AuthService

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8080/api/bookings';  // Địa chỉ API của bạn

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSpecialties(): Observable<any[]> {
    const token = this.authService.getToken();  // Lấy token từ AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>('http://localhost:8080/api/specialties', { headers });
  }

  // Lấy danh sách bác sĩ theo chuyên khoa
  getDoctorsBySpecialty(specialtyId: number): Observable<any> {
    const token = this.authService.getToken();  // Lấy token từ AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/doctors?specialtyId=${specialtyId}`, { headers });
  }

  // Lấy khung giờ có sẵn của bác sĩ
  getAvailableTimeSlots(specialtyId: number, doctorId: number, date: string): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/available-times?specialtyId=${specialtyId}&doctorId=${doctorId}&date=${date}`, { headers });
  }
  

  // Tạo cuộc hẹn
  createBooking(bookingData: any): Observable<any> {
    const token = this.authService.getToken();  // Lấy token từ AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/create-booking`, bookingData, { headers });
  }

  // Xác nhận cuộc hẹn
  confirmBooking(id: number): Observable<any> {
    const token = this.authService.getToken();  // Lấy token từ AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/confirm/${id}`, {}, { headers });
  }

  // Hủy cuộc hẹn
  cancelBooking(id: number, reason: string): Observable<any> {
    const token = this.authService.getToken();  // Lấy token từ AuthService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/cancel/${id}?reason=${reason}`, {}, { headers });
  }
}
