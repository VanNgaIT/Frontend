import { Component, OnInit } from '@angular/core';
import { Histories } from '../model/history.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  histories: Histories[] = [];  // Mảng hồ sơ bệnh án

  constructor() { }

  ngOnInit(): void {
  }

  // Thêm mới hồ sơ
  onAddHistory(): void {
    console.log('Thêm hồ sơ mới');
    // Mở modal hoặc chuyển đến trang thêm hồ sơ mới
  }

  // Chỉnh sửa hồ sơ
  onEditHistory(history: Histories): void {
    console.log('Sửa hồ sơ:', history);
    // Chuyển đến trang sửa hồ sơ hoặc mở modal sửa
  }

  // Xóa hồ sơ
  onDeleteHistory(historyId: number): void {
    console.log('Xóa hồ sơ với ID:', historyId);
    // Gọi API xóa hoặc thực hiện thao tác xóa tại đây
  }
}
