import { Component, OnInit } from '@angular/core';
import { Histories } from '../model/history.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HistoryService } from '../service/history.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  
  searchQuery: string = ''; // Biến lưu trữ giá trị tìm kiếm
  histories: Histories[] = []; // Danh sách hồ sơ bệnh án
  selectedHistory: Histories | null = null; // Hồ sơ bệnh án đang chọn để chỉnh sửa

  constructor(private historyService: HistoryService) { }

  ngOnInit(): void {
    this.getAllHistories(); // Lấy tất cả hồ sơ bệnh án khi component được khởi tạo
  }

  // Lấy tất cả hồ sơ bệnh án
  getAllHistories(): void {
    this.historyService.getAllHistorys().subscribe(
      (data: Histories[]) => {
        this.histories = data;
      },
      (error) => {
        console.error('Error fetching histories', error);
      }
    );
  }

  // Tìm kiếm hồ sơ bệnh án theo ID người dùng
  searchUserById(): void {
    if (this.searchQuery) {
      this.historyService.getHistoryById(Number(this.searchQuery)).subscribe(
        (data: Histories) => {
          this.histories = [data]; // Chỉ hiển thị một hồ sơ bệnh án khi tìm kiếm
        },
        (error) => {
          console.error('Error fetching history by ID', error);
        }
      );
    }
  }

  // Thực hiện thao tác chỉnh sửa hồ sơ bệnh án
  onEditHistory(history: Histories): void {
    this.selectedHistory = history; // Chọn hồ sơ bệnh án để chỉnh sửa
  }

  // Xóa hồ sơ bệnh án
  onDeleteHistory(id: number): void {
    this.historyService.deleteHistory(id).subscribe(
      () => {
        this.histories = this.histories.filter(history => history.id !== id); // Xóa khỏi danh sách hiển thị
      },
      (error) => {
        console.error('Error deleting history', error);
      }
    );
  }

  // Tạo mới hoặc chỉnh sửa hồ sơ bệnh án
  saveHistory(formData: any): void {
    if (this.selectedHistory) {
      // Cập nhật hồ sơ bệnh án
      this.historyService.updateHistory(this.selectedHistory.id, formData).subscribe(
        (updatedHistory) => {
          // Cập nhật lại danh sách sau khi chỉnh sửa
          const index = this.histories.findIndex(history => history.id === updatedHistory.id);
          this.histories[index] = updatedHistory;
        },
        (error) => {
          console.error('Error updating history', error);
        }
      );
    } else {
      // Tạo mới hồ sơ bệnh án
      this.historyService.createHistory(formData).subscribe(
        (newHistory) => {
          this.histories.push(newHistory); // Thêm hồ sơ mới vào danh sách
        },
        (error) => {
          console.error('Error creating history', error);
        }
      );
    }
  }
}
