import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router'
import { tap, catchError } from 'rxjs/operators';  
import { BookingApiResponse } from '../model/bookingResponse.model';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
  })
  export class BookingDesireService {
  
    private apiUrl = 'http://localhost:8080/api/bookings';  
  
    constructor(private http: HttpClient, private authService: AuthService, private router: Router, private toastr: ToastrService) {}
  
    private getAuthHeaders(): HttpHeaders {
      const token = this.authService.getToken();  
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
  
    getSpecialties(): Observable<any[]> {
      const token = this.authService.getToken();  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<any[]>('http://localhost:8080/api/specialties', { headers });
    }
  
    // Lấy danh sách bác sĩ theo chuyên khoa
    getDoctorsBySpecialty(specialtyId: number): Observable<any> {
      const token = this.authService.getToken();  
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get(`${this.apiUrl}/doctors?specialtyId=${specialtyId}`, { headers });
    }
}