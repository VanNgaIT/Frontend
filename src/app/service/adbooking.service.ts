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
    private apiUrlDetails = 'http://localhost:8080/api/bookings-details';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();  // Lấy token từ AuthService
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
      }

      // getBookingDetails(bookingId: number): Observable<BookingDetails> {
      //   const headers = this.getAuthHeaders();
      //   return this.http.get<BookingDetails>(`${this.apiUrl}/${bookingId}/details`, { headers });
      // }

      getBookingDetails(bookingId: number): Observable<any> {
        return new Observable((observer) => {
          this.getDoctor(bookingId).subscribe((doctor) => {
            this.getTimeSlot(bookingId).subscribe((timeSlot) => {
              this.getUser(bookingId).subscribe((user) => {
                observer.next({ bookingId, doctor, timeSlot, user });
                observer.complete();
              });
            });
          });
        });
      }

    getDoctor(bookingId: number): Observable<any> {
      return this.http.get(`${this.apiUrlDetails}/${bookingId}/doctor`);
    }
  
    // API để lấy thông tin thời gian
    getTimeSlot(bookingId: number): Observable<any> {
      return this.http.get(`${this.apiUrlDetails}/${bookingId}/timeslot`);
    }
  
    // API để lấy thông tin người dùng
    getUser(bookingId: number): Observable<any> {
      return this.http.get(`${this.apiUrlDetails}/${bookingId}/user`);
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
