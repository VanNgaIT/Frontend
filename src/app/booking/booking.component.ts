import { Component, OnInit } from '@angular/core';
import { Booking } from '../model/booking.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { AdminBookingService } from '../service/adbooking.service';
import { BookingDetails } from '../model/bookingDetail.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = [];
  selectedBooking: Booking | null = null;
  selectedBookingDetails: BookingDetails[] = [];
  selectedDoctor: any = null;
  selectedTimeSlot: any = null;
  selectedUser: any = null;

  constructor(private bookingService: AdminBookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  // Lấy tất cả lịch hẹn
  // 
  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe((data) => {
      this.bookings = data;
      this.loadBookingDetails();  // Sau khi có danh sách booking, load chi tiết cho từng booking
    });
  }


  loadBookingDetails(): void {
    this.bookings.forEach((booking) => {
      this.bookingService.getBookingDetails(booking.id).subscribe((details) => {
        this.selectedBookingDetails.push(details); // Thêm thông tin chi tiết vào mảng
      });
    });
  }

  onSelectBooking(bookingId: number): void {
    // Lấy thông tin chi tiết cuộc hẹn
    this.bookingService.getBookingById(bookingId).subscribe((booking) => {
      this.selectedBooking = booking;  // Lưu thông tin cuộc hẹn vào selectedBooking
  
      // Lấy thông tin bác sĩ, thời gian và người dùng
      this.bookingService.getDoctor(bookingId).subscribe((doctor) => {
        this.selectedDoctor = doctor;  // Lưu thông tin bác sĩ vào selectedDoctor
      });
  
      this.bookingService.getTimeSlot(bookingId).subscribe((timeSlot) => {
        this.selectedTimeSlot = timeSlot;  // Lưu thông tin thời gian vào selectedTimeSlot
      });
  
      this.bookingService.getUser(bookingId).subscribe((user) => {
        this.selectedUser = user;  // Lưu thông tin người dùng vào selectedUser
      });
    }, (error) => {
      console.error('Error fetching booking details:', error);
    });
  }
  // Chỉnh sửa lịch hẹn
  onEditBooking(booking: Booking): void {
    this.bookingService.getBookingById(booking.id).subscribe((data) => {
      this.selectedBooking = data;
    });
  }

  // Cập nhật lịch hẹn
  onUpdateBooking(): void {
    if (this.selectedBooking) {
      this.bookingService.updateBooking(this.selectedBooking.id, this.selectedBooking).subscribe(() => {
        this.loadBookings();
        this.selectedBooking = null;
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
      case 'CONFIRMED': return 'Đã xác nhận';
      case 'CANCELLED': return 'Đã hủy';
      default: return 'Không xác định';
    }
  }
  
}
