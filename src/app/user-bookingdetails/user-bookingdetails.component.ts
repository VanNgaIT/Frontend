import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HistoryService } from '../service/history.service';
import { jwtDecode } from 'jwt-decode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Booking } from '../model/booking.model';
import { UserBookingDetailService } from '../service/user-bookingdetails.service';


@Component({
  selector: 'app-user-bookingdetails',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './user-bookingdetails.component.html',
  styleUrl: './user-bookingdetails.component.scss'
})
export class UserBookingDetailsComponent {

  constructor(private bookingDetailService: UserBookingDetailService) {}
  
  history: Booking[] = [];
     ngOnInit(): void {
       this.loadHistory();
     }

     loadHistory() {
      this.bookingDetailService.getBookingByUserId().subscribe((data: Booking[]) => {
        this.history = data;
        // Gán giá trị mặc định cho rating nếu không có
        this.history.forEach(record => {
        });
      });
    }

    cancelBooking(id: number): void {
      // Gửi yêu cầu hủy đến backend
      this.bookingDetailService.deleteBookingByUser(id).subscribe({
          next: () => {
              alert('Hủy đặt hẹn thành công');
              this.loadHistory(); // Load lại danh sách sau khi hủy
          },
          error: (err) => {
              console.error('Lỗi khi hủy đặt hẹn:', err);
              alert('Không thể hủy đặt hẹn, vui lòng thử lại sau.');
          },
      });
  }
    
}
