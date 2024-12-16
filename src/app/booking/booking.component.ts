import { Component, OnInit } from '@angular/core';
import { Booking } from '../model/booking.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { AdminBookingService } from '../service/adbooking.service';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']  // fixed typo `styleUrl` -> `styleUrls`
})
export class BookingComponent implements OnInit {
  searchQuery: string = '';
  bookings: Booking[] = [];
  selectedBooking: Booking = {
    id: 0,
    statusId: '',
    doctorId: 0,
    doctorName: '',
    userId: 0,
    userName: '',
    cancelReason: '',
    date: new Date(),
    timeSlotId: 0,
    startTime: '',
    endTime: '',
    createdAt: new Date,
    updatedAt: new Date,
  }

  constructor(private bookingService: AdminBookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  // Lấy tất cả lịch hẹn
  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(
      (data: Booking[]) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching bookings', error);
      }
    );
  }

  // Chỉnh sửa lịch hẹn
  onEditBooking(booking: Booking): void {
    this.bookingService.getBookingById(booking.id).subscribe(
      (data: Booking) => {
        this.selectedBooking = { ...data }; // Sao chép dữ liệu vào selectedBooking
      },
      (error) => {
        console.error('Error fetching booking details', error);
      }
    );
  }

  // Cập nhật lịch hẹn
  onUpdateBooking(): void {
    if (this.selectedBooking.id) {
      this.bookingService.updateBooking(this.selectedBooking.id, this.selectedBooking).subscribe((booking: Booking) => {
        this.loadBookings();
        this.selectedBooking = {
          id: 0,
          statusId: '',
          doctorId: 0,
          doctorName: '',
          userId: 0,
          userName: '',
          cancelReason: '',
          date: new Date(),
          timeSlotId: 0,
          startTime: '',
          endTime: '',
          createdAt: new Date,
          updatedAt: new Date,
        }
      });
    }
  }

  // Xóa lịch hẹn
  onDeleteBooking(id: number): void {
    this.bookingService.deleteBooking(id).subscribe(() => {
      this.loadBookings();
    });
  }

  getStatusClass(statusId: string): string {
    switch (statusId) {
      case 'PENDING': return 'text-warning';
      case 'CONFIRMED': return 'text-success';
      case 'CANCELLED': return 'text-danger';
      default: return '';
    }
  }

  // Phương thức để lấy trạng thái dưới dạng văn bản
  getStatusText(statusId: string): string {
    switch (statusId) {
      case 'PENDING': return 'Chờ xác nhận';
      case 'WAIT': return 'Đã xác nhận';
      case 'CANCELLED': return 'Đã hủy';
      case 'NOT_ATTENDED': return 'Không tham gia';
      default: return 'Không xác định';
    }
  }
}
