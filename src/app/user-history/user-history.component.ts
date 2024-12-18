import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HistoryService } from '../service/history.service';
import { jwtDecode } from 'jwt-decode';
import { Histories } from '../model/history.model';
import { UserHistoryService } from '../service/user-history.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-history',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FormsModule, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './user-history.component.html',
  styleUrl: './user-history.component.scss'
})
export class UserHistoryComponent {

  constructor(private userHistoryService: UserHistoryService) {}
  
  history: Histories[] = [];
     ngOnInit(): void {
       this.loadHistory();
     }

     loadHistory() {
      this.userHistoryService.getHistoriesByUserId().subscribe((data: Histories[]) => {
        this.history = data;
        // Gán giá trị mặc định cho rating nếu không có
        this.history.forEach(record => {
          if (!record.rating) {
            record.rating = '';
          }
        });
      });
    }
    saveRatings() {
      console.log('Danh sách đánh giá:', this.history);
  
      // Gửi danh sách đánh giá lên server
      this.userHistoryService.saveRatings(this.history).subscribe(response => {
        console.log('Đã lưu đánh giá thành công!', response);
        alert('Đánh giá đã được lưu thành công.');
      });
    }
}
