import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';

interface TimeSlot {
  id: number;
  start: string;
  end: string;
}

interface WorkShift {
  timeSlot: TimeSlot;
  isAvailable: boolean;
}

interface Appointment {
  customerName: string;
  timeSlot: TimeSlot;
}

@Component({
  selector: 'app-lich-lam-doctor',
  standalone: true,
  imports: [FormsModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './lich-lam-doctor.component.html',
  styleUrl: './lich-lam-doctor.component.scss'
})

export class LichLamDoctorComponent {
  // Ngày được chọn từ form
  selectedDate: string = '';
  selectedTimeSlot: number = 0;

  // Dữ liệu khung giờ
  timeSlots: TimeSlot[] = [
    { id: 1, start: '08:00', end: '09:00' },
    { id: 2, start: '09:00', end: '10:00' },
    { id: 3, start: '10:00', end: '11:00' },
    { id: 4, start: '13:00', end: '14:00' },
    { id: 5, start: '14:00', end: '15:00' },
  ];

  // Ca làm việc của bác sĩ
  workShifts: WorkShift[] = [];

  // Danh sách cuộc hẹn
  appointments: Appointment[] = [];

  constructor() {}

  // Hàm gọi khi nhấn submit form
  viewSchedule(): void {
    // Kiểm tra dữ liệu ngày và khung giờ
    if (!this.selectedDate || !this.selectedTimeSlot) {
      alert('Vui lòng chọn ngày và khung giờ hợp lệ!');
      return;
    }

    // Giả lập lấy dữ liệu ca làm việc từ backend
    this.fetchDoctorSchedule();

    // Giả lập lấy danh sách cuộc hẹn từ backend
    this.fetchAppointments();
  }

  // Hàm giả lập lấy dữ liệu ca làm việc
  fetchDoctorSchedule(): void {
    this.workShifts = this.timeSlots.map((slot) => ({
      timeSlot: slot,
      isAvailable: Math.random() > 0.5, // Giả lập trạng thái còn trống hay đã kết thúc
    }));
  }

  // Hàm giả lập lấy dữ liệu cuộc hẹn
  fetchAppointments(): void {
    const randomAppointments: Appointment[] = [
      {
        customerName: 'Nguyễn Văn A',
        timeSlot: this.timeSlots[0],
      },
      {
        customerName: 'Trần Thị B',
        timeSlot: this.timeSlots[2],
      },
      {
        customerName: 'Lê Văn C',
        timeSlot: this.timeSlots[4],
      },
    ];

    // Lọc các cuộc hẹn chỉ trong ngày đã chọn
    this.appointments = randomAppointments.filter(
      (app) => this.timeSlots.includes(app.timeSlot)
    );
  }
}

