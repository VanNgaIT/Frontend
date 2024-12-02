import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'
import { tap, catchError } from 'rxjs/operators';  
import { BookingApiResponse } from '../model/bookingResponse.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8080/api/bookings';  // Địa chỉ API của bạn

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

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
    const formattedData = {
      doctorId: Number(bookingData.doctorId),
      timeSlotId: this.mapTimeSlotToId(bookingData.timeSlot),
      date: new Date(bookingData.appointmentDate),
      patientId: bookingData.userId
    };
  
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.post<BookingApiResponse>(`${this.apiUrl}/create-booking`, formattedData, { headers }).pipe(
      tap(response => {
        if (response?.message) {
          alert(response.message);  // Hiển thị thông báo thành công
          this.router.navigate(['/home']);
        } else if (response?.error) {
          alert(response.error);  // Hiển thị thông báo lỗi nếu có lỗi từ API
        } else {
          alert('Cuộc hẹn đã được tạo thành công'); // Nếu không có thông báo lỗi hay thành công trong response
        }
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        alert('Bạn còn cuộc hẹn chưa khám, hãy hoàn thành để tạo cuộc hẹn khác!');
        return of(null);  // Hoặc có thể trả về một giá trị mặc định nào đó
      })
    );
  }
  
  // Hàm giả định để map timeSlot (chuỗi) sang timeSlotId
  private mapTimeSlotToId(timeSlot: string): number {
    const timeSlotMapping: { [key: string]: number } = {
      "08:00:00": 1,
      "09:00:00": 2,
      "10:00:00": 3
    };
  
    return timeSlotMapping[timeSlot] || 0; // Trả về 0 nếu không tìm thấy
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
