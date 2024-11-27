import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BookingService } from '../service/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Specialty } from '../model/specialty.model';
import { SpecialtyService } from '../service/specialty.service';
@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './user-booking.component.html',
  styleUrl: './user-booking.component.scss'
})
export class UserBookingComponent implements OnInit {
  specialties: any[] = [];  // Danh sách chuyên khoa
  doctors: any[] = [];      // Danh sách bác sĩ
  timeSlots: any[] = [];    // Danh sách khung giờ có sẵn

  selectedSpecialtyId: number = 0;
  selectedDoctorId: number = 0;
  selectedTimeSlot: string = '';
  appointmentDate: string = '';

  constructor(private bookingService: BookingService, private specialtyService: SpecialtyService) {}

  ngOnInit(): void {
    // Lấy danh sách chuyên khoa (ví dụ từ API của bạn)
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

  // Khi chọn chuyên khoa, tải danh sách bác sĩ
  onSpecialtyChange(): void {
    this.bookingService.getDoctorsBySpecialty(this.selectedSpecialtyId).subscribe((data) => {
      this.doctors = data;
    });
  }

  // Khi chọn bác sĩ, tải khung giờ có sẵn
  onDoctorChange(): void {
    this.bookingService.getAvailableTimeSlots(this.selectedDoctorId, this.appointmentDate).subscribe((data) => {
      this.timeSlots = data;
    });
  }

  // Đặt lịch
  onSubmit(): void {
    const bookingData = {
      doctorId: this.selectedDoctorId,
      timeSlot: this.selectedTimeSlot,
      appointmentDate: this.appointmentDate,
      userId: 1  // Giả sử là người dùng hiện tại
    };

    this.bookingService.createBooking(bookingData).subscribe(response => {
      console.log('Cuộc hẹn đã được tạo thành công:', response);
    }, error => {
      console.log('Lỗi khi tạo cuộc hẹn:', error);
    });
  }
}
