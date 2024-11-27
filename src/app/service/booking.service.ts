import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8080/api/bookings';  // Địa chỉ API của bạn

  constructor(private http: HttpClient) {}

  getSpecialties(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/api/specialties');
  }
  // Lấy danh sách bác sĩ theo chuyên khoa
  getDoctorsBySpecialty(specialtyId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/by-specialty?specialtyId=${specialtyId}`);
  }

  // Lấy khung giờ có sẵn của bác sĩ
  getAvailableTimeSlots(doctorId: number, date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/available-times?doctorId=${doctorId}&date=${date}`);
  }

  // Tạo cuộc hẹn
  createBooking(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-booking`, bookingData);
  }

  // Xác nhận cuộc hẹn
  confirmBooking(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/confirm/${id}`, {});
  }

  // Hủy cuộc hẹn
  cancelBooking(id: number, reason: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cancel/${id}?reason=${reason}`, {});
  }
}
