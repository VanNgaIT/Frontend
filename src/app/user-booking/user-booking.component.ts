import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BookingService } from '../service/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Specialty } from '../model/specialty.model';
import { SpecialtyService } from '../service/specialty.service';
import { DatePipe } from '@angular/common';
import { TimeSlot } from '../model/timeslot.model';

@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, CommonModule],
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.scss']
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

  onDoctorChange(): void {
    if (this.selectedSpecialtyId && this.selectedDoctorId && this.appointmentDate) {
      const formattedDate = this.formatDate(this.appointmentDate);  // Chuyển đổi ngày thành yyyy-MM-dd
      this.bookingService.getAvailableTimeSlots(this.selectedSpecialtyId, this.selectedDoctorId, formattedDate)
        .subscribe((data: any) => {
          // Lấy danh sách khung giờ từ dữ liệu trả về (kiểm tra đúng cấu trúc)
          this.timeSlots = data[0]?.availableTimeSlots || [];  // Đảm bảo lấy mảng availableTimeSlots
  
          console.log('Dữ liệu thời gian:', this.timeSlots);  // Kiểm tra dữ liệu thời gian
  
          // Kiểm tra nếu timeSlots không trống và có thông tin giờ hợp lệ
          if (this.timeSlots && this.timeSlots.length > 0) {
            this.timeSlots = this.timeSlots.filter(slot => {
              console.log('Slot:', slot);  // Kiểm tra từng slot
              return slot.startTime && slot.endTime;  // Kiểm tra sự tồn tại của startTime và endTime
            });
  
            if (this.timeSlots.length === 0) {
              console.error('Không có khung giờ hợp lệ.');
            } else {
              console.log('Khung giờ hợp lệ:', this.timeSlots);
            }
          } else {
            console.error('Không có khung giờ nào được tìm thấy.');
          }
        }, (error) => {
          console.error('Lỗi khi lấy khung giờ: ', error);
        });
    } else {
      console.error('Thông tin không hợp lệ: Chuyên khoa, bác sĩ hoặc ngày hẹn không hợp lệ.');
    }
  }
  
  convertToTimeString(time: string): string {
    if (!time || typeof time !== 'string' || !time.includes(':')) {
      console.error('Thời gian không hợp lệ:', time);
      return 'Giờ không hợp lệ';  // Trả về chuỗi thông báo nếu thời gian không hợp lệ
    }
  
    const [hours, minutes] = time.split(':').map(Number);
  
    if (isNaN(hours) || isNaN(minutes)) {
      console.error('Giá trị giờ, phút không hợp lệ:', time);
      return 'Giờ không hợp lệ';  // Trả về chuỗi thông báo nếu thời gian không hợp lệ
    }
  
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`; // Trả về định dạng giờ:phút
  }
  
  
  convertToDate(time: string): Date {
    if (!time || typeof time !== 'string' || !time.includes(':')) {
      console.error('Thời gian không hợp lệ:', time);
      return new Date();  // Trả về ngày mặc định nếu thời gian không hợp lệ
    }
  
    const [hours, minutes, seconds] = time.split(':').map(Number);
  
    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
      console.error('Giá trị giờ, phút, giây không hợp lệ:', time);
      return new Date();  // Trả về ngày mặc định nếu giờ, phút, giây không hợp lệ
    }
  
    const now = new Date();
    now.setHours(hours, minutes, seconds, 0);  // Thiết lập giờ, phút, giây
    return now;
  }

  // Chuyển đổi ngày thành yyyy-MM-dd
  formatDate(date: any): string {
    const d = new Date(date); // Chuyển đổi thành đối tượng Date nếu chưa phải
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Trả về định dạng yyyy-MM-dd
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
