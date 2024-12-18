import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpecialtyService } from '../service/specialty.service';
import { HttpHeaders } from '@angular/common/http';
import { BookingDesireService } from '../service/bookingdesire.service';

@Component({
    selector: 'app-bookingdesire',
    standalone: true,
    imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
    templateUrl: './bookingdesire.component.html',
    styleUrls: ['./bookingdesire.component.scss']
  })

export class BookingDesireComponent implements OnInit {
    minDate: string = '';  
    maxDate: string = '';
    doctors: any[] = [];   

    specialties: any[] = [];
    selectedSpecialtyId: number = 0;

    constructor(private bookingDesireService: BookingDesireService, private specialtyService: SpecialtyService) {}

    ngOnInit(): void {

        const today = new Date();
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(today.getFullYear() + 1);
        this.minDate = today.toISOString().split('T')[0]; // Định dạng yyyy-MM-dd
        this.maxDate = oneYearFromNow.toISOString().split('T')[0]; // Định dạng yyyy-MM-dd
        this.loadSpecialties();
        
      }

      
loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe(
      (response) => {
        this.specialties = response; // Xử lý dữ liệu trả về
      },
      (error) => {
        console.error('Lỗi khi tải danh sách chuyên khoa:', error);
      }
    );
  }

  onSpecialtyChange(): void {
    this.bookingDesireService.getDoctorsBySpecialty(this.selectedSpecialtyId).subscribe((data) => {
      this.doctors = data;
    });
  }
}