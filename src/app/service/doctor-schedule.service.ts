import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Histories } from '../model/history.model';
import { Doctor } from '../model/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorScheduleService {

  private apiUrlDoctor = 'http://localhost:8080/api/doctors'

  private apiUrlTimeSlot = 'http://localhost:8080/api/time-slots'

  private apiUrlBooking = 'http://localhost:8080/api/bookings'

  constructor(private http: HttpClient, private authService: AuthService) { }

    private getAuthHeaders(): HttpHeaders {
      const token = this.authService.getToken();  // Lấy token từ AuthService
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
  
    getDoctorByUserId(): Observable<Doctor> {
      const headers = this.getAuthHeaders();
      return this.http.get<Doctor>(`${this.apiUrlDoctor}/doctor/user`, { headers });
    }

    getTimeslotsByDoctorId(doctorId: number): Observable<any[]> {
        const headers = this.getAuthHeaders();
        return this.http.get<any[]>(`${this.apiUrlTimeSlot}/doctor/${doctorId}/timeslot`, { headers });
    }

    getBookingsByDoctorId(doctorId: number): Observable<any[]> {
      const headers = this.getAuthHeaders();
      return this.http.get<any[]>(`${this.apiUrlBooking}/doctor/${doctorId}/booking`, { headers });
    }

    putStatusBooking(id: number): Observable<void> {
      const headers = this.getAuthHeaders();
      return this.http.put<void>(`${this.apiUrlBooking}/update/bookings/${id}`, {}, { headers });
    }
}