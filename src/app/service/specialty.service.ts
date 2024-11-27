import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // Giả sử bạn có AuthService để quản lý token

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  private apiUrl = 'http://localhost:8080/api/specialties';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getSpecialties(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());
    return this.http.get(this.apiUrl, { headers });
  }
}
