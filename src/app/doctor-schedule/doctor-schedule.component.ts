import { Component, OnInit } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { DoctorScheduleService } from '../service/doctor-schedule.service';


@Component({
  selector: 'app-doctor-schedule',
  standalone: true,
  imports: [FormsModule, SidebarAdminComponent, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './doctor-schedule.component.html',
  styleUrl: './doctor-schedule.component.scss'
})

export class DoctorScheduleComponent implements OnInit {
  doctorId: number | null = null;  // Biến lưu trữ ID bác sĩ
  timeslots: any[] = [];  // Mảng lưu trữ timeslot
  bookings: any[] = []

  workShifts: any[] = [];  // Mảng chứa danh sách ca làm việc
  appointments: any[] = [];  // Mảng chứa danh sách cuộc hẹn
  selectedDate: string | null = null;  // Ngày được chọn
  selectedTimeSlot: any = null;

  constructor(private doctorScheduleService: DoctorScheduleService) {}

  ngOnInit(): void {
    // Lấy thông tin bác sĩ từ API
    this.doctorScheduleService.getDoctorByUserId().subscribe({
      next: (doctorData) => {
        this.doctorId = doctorData.id;  // Lưu ID bác sĩ vào biến
        this.getTimeslots(this.doctorId);  // Gọi API lấy timeslot sau khi có ID bác sĩ
        this.getBooking(this.doctorId)
      },
      error: (err) => {
        console.error('Error fetching doctor data:', err);
      }
    });

    
  }

  // API gọi lấy timeslot theo doctorId
  getTimeslots(doctorId: number): void {
    this.doctorScheduleService.getTimeslotsByDoctorId(doctorId).subscribe({
      next: (timeslotData) => {
        this.timeslots = timeslotData;  // Lưu timeslot vào biến timeslots
        this.workShifts = timeslotData; // Hiển thị ngay ca làm việc sau khi có dữ liệu timeslot
      },
      error: (err) => {
        console.error('Error fetching timeslots:', err);
      }
    });
  }

  getBooking(doctorId: number): void {
    this.doctorScheduleService.getBookingsByDoctorId(doctorId).subscribe({
      next: (bookingData) => {
        this.bookings = bookingData;  // Lưu timeslot vào biến timeslots
        this.appointments = bookingData; // Hiển thị ngay ca làm việc sau khi có dữ liệu timeslot
      },
      error: (err) => {
        console.error('Error fetching timeslots:', err);
      }
    });
  }

  

  updateBooking(id: number): void {
    // Gửi yêu cầu hủy đến backend
    this.doctorScheduleService.putStatusBooking(id).subscribe({
        next: () => {
            alert('Thành công');
            window.location.reload();
        },
        error: (err) => {
            console.error('Lỗi khi hủy đặt hẹn:', err);
            alert('Lỗi');
        },
    });
}
}
