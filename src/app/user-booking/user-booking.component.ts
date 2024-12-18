import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { BookingService } from '../service/booking.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SpecialtyService } from '../service/specialty.service';
import { HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-user-booking',
  standalone: true,
  imports: [HeaderComponent,RouterModule, FooterComponent, FormsModule, CommonModule],
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

  minDate: string = '';  // Khởi tạo giá trị mặc định
  maxDate: string = '';  // Khởi tạo giá trị mặc định

  isDateValid: boolean = true; // Biến kiểm tra tính hợp lệ của ngày

  constructor(private bookingService: BookingService, private specialtyService: SpecialtyService, private router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(today.getFullYear() + 1);
    this.minDate = today.toISOString().split('T')[0]; // Định dạng yyyy-MM-dd
    this.maxDate = oneYearFromNow.toISOString().split('T')[0]; // Định dạng yyyy-MM-dd
    this.loadSpecialties();
    this.setMinMaxDates();
  }


  setMinMaxDates(): void {
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));  // Chủ nhật của tuần này
    this.minDate = this.formatDate(today);  // Ngày hôm nay
    this.maxDate = this.formatDate(endOfWeek);  // Ngày Chủ nhật
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


  // Thêm hàm onDoctorChange() vào đây để xử lý khi người dùng chọn bác sĩ
  onDoctorChange(): void {
    this.timeSlots = [];
    // Kiểm tra xem bác sĩ và ngày có hợp lệ không
    if (this.selectedDoctorId && this.appointmentDate) {
      this.loadAvailableTimeSlots();  // Gọi lại hàm tải khung giờ mới
    } else {
      console.error('Vui lòng chọn bác sĩ và ngày hợp lệ.');
    }
  }
  isValidAppointmentDate(date: string): boolean {
    const selectedDate = new Date(date);
    const today = new Date();
    // Chuyển đối tượng today và selectedDate về thời gian không có múi giờ
    today.setHours(0, 0, 0, 0);  // Đặt giờ của hôm nay là 00:00:00
    selectedDate.setHours(0, 0, 0, 0);  // Đặt giờ của selectedDate là 00:00:00
    // Kiểm tra ngày không phải quá khứ
    if (selectedDate < today) {
        return false;
    }
    // Tính toán ngày cuối tuần (Chủ nhật)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay())); // Chủ nhật là cuối tuần (getDay() trả về 0 cho Chủ nhật)
    return selectedDate <= endOfWeek;
  }


  onDateChange(): void {
    this.isDateValid = this.isValidAppointmentDate(this.appointmentDate);
    if (!this.isDateValid) {
      this.timeSlots = [];  // Nếu ngày không hợp lệ, làm trống các khung giờ
      alert('Ngày chọn không hợp lệ. Vui lòng chọn ngày trong khoảng từ hôm nay đến 1 năm tới.');
    } else {
      this.loadAvailableTimeSlots();  // Nếu ngày hợp lệ, tải lại khung giờ
    }
  }


  // Tải lại khung giờ cho bác sĩ và ngày đã chọn
  loadAvailableTimeSlots(): void {
    if (this.selectedDoctorId && this.appointmentDate) {
      const formattedDate = this.formatDate(this.appointmentDate);  // Chuyển đổi ngày thành yyyy-MM-dd
      this.bookingService.getAvailableTimeSlots(this.selectedSpecialtyId, this.selectedDoctorId, formattedDate)
        .subscribe((data: any) => {
          this.timeSlots = data[0]?.availableTimeSlots || [];  // Đảm bảo lấy mảng availableTimeSlots
          if (this.timeSlots && this.timeSlots.length === 0) {
            console.error('Không có khung giờ hợp lệ.');
          }
        }, (error) => {
          console.error('Lỗi khi lấy khung giờ:', error);
        });
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


  onSubmit(): void {
    if (!this.appointmentDate || !this.selectedDoctorId || !this.selectedTimeSlot || !this.selectedSpecialtyId) {
      alert('Vui lòng chọn đầy đủ thông tin trước khi đặt lịch!');
      return;
    }
    const bookingData = {
      doctorId: this.selectedDoctorId,
      timeSlot: this.selectedTimeSlot, // Đã là id rồi, không cần convert gì thêm
      appointmentDate: this.appointmentDate,
    };
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Không tìm thấy token, vui lòng đăng nhập lại!');
      return;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    this.bookingService.createBooking(bookingData).subscribe(
      (response) => {
        console.log('Response:', response);
      },
      (error) => {
        console.error('Lỗi khi tạo cuộc hẹn:', error);
        alert('Bạn còn cuộc hẹn chưa khám, vui lòng hoàn thành!');
      }
    );
  }

  onCancel(bookingId: number): void {
    this.bookingService.deleteBooking(bookingId).subscribe(
      () => {
        console.log('Hủy cuộc hẹn thành công!');
      },
      (error) => {
        console.error('Lỗi khi hủy cuộc hẹn:', error);
        // Xử lý lỗi khi gọi API nếu có
      }
    );
  }
  
}
