import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../model/booking.model';
import { AuthService } from './auth.service';
import { BookingDetails } from '../model/bookingDetail.model';

@Injectable({
  providedIn: 'root'
})

export class AdminBookingService {
    private apiUrl = 'http://localhost:8080/api/bookings'; // URL của API bác sĩ

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();  // Lấy token từ AuthService
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      }

      getBookingDetails(bookingId: number): Observable<BookingDetails> {
        const headers = this.getAuthHeaders();
        return this.http.get<BookingDetails>(`${this.apiUrl}${bookingId}/details`, { headers });
      }

  getAllBookings(): Observable<Booking[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<Booking[]>(`${this.apiUrl}`, { headers });
     }
  getBookingById(bookingId: number): Observable<Booking> {
        const headers = this.getAuthHeaders();
        return this.http.get<Booking>(`${this.apiUrl}/${bookingId}`, { headers });
      }

      // Cập nhật người dùng
      updateBooking(id: number, booking: Booking): Observable<Booking> {
        const headers = this.getAuthHeaders();
        return this.http.put<Booking>(`${this.apiUrl}/${id}`, booking, { headers });
      }
    
      // Xóa người dùng
      deleteBooking(id: number): Observable<void> {
        const headers = this.getAuthHeaders();
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
      }
}
