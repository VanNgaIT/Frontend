import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Import AuthService
import { Booking } from '../model/booking.model';

@Injectable({
  providedIn: 'root'
})
export class UserBookingDetailService {

  private apiUrl = 'http://localhost:8080/api/bookings'; // Đảm bảo rằng bạn có URL API thích hợp

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); 
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getBookingByUserId(): Observable<Booking[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<Booking[]>(`${this.apiUrl}/all-booking/user`, { headers });
    }

    deleteBookingByUser(id: number): Observable<void> {
      const headers = this.getAuthHeaders();
      return this.http.delete<void>(`${this.apiUrl}/booking/user/${id}`, { headers });
    }
  
}
