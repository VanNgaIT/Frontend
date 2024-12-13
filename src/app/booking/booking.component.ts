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
  selectedBookingDetails: BookingDetails | null = null;

  constructor(private bookingService: AdminBookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  // Lấy tất cả lịch hẹn
  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe((data) => {
      this.bookings = data;
    });
  }

  onSelectBooking(bookingId: number): void {
    this.bookingService.getBookingDetails(bookingId).subscribe((data) => {
      this.selectedBookingDetails = data;
      console.log('Booking details:', this.selectedBookingDetails);
      // Bạn có thể hiển thị thông tin này trong form hoặc bảng
    });
  }
  // Chỉnh sửa lịch hẹn
  onEditBooking(booking: Booking): void {
    this.bookingService.getBookingById(booking.id).subscribe((data) => {
      this.selectedBooking = data;
      // Giả sử bạn có một form để hiển thị thông tin lịch hẹn đã chọn
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
