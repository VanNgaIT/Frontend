import { Component, OnInit } from '@angular/core';
import { Booking } from '../model/booking.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  bookings: Booking[] = []; // Danh sách lịch hẹn

  constructor() {}

  ngOnInit(): void {
  }

  getStatusText(statusId: string): string {
    switch (statusId) {
      case 'PENDING':
        return 'Chờ xác nhận';
      case 'CONFIRMED':
        return 'Đã xác nhận';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  }

  getStatusClass(statusId: string): string {
    switch (statusId) {
      case 'PENDING':
        return 'status-pending';
      case 'CONFIRMED':
        return 'status-confirmed';
      case 'CANCELLED':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  onAddBooking(): void {
    console.log('Thêm lịch hẹn');
    // Logic thêm lịch hẹn
  }

  onEditBooking(booking: Booking): void {
    console.log('Sửa lịch hẹn:', booking);
    // Logic sửa lịch hẹn
  }

  onDeleteBooking(id: number): void {
    console.log('Xóa lịch hẹn ID:', id);
    // Logic xóa lịch hẹn
  }
}
