import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../model/timeslot.model';
import { Schedule } from '../model/schedule.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-time-slot',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './time-slot.component.html',
  styleUrl: './time-slot.component.scss'
})
export class TimeSlotComponent implements OnInit {
  // Mảng lưu danh sách các ca làm việc (Dữ liệu giả lập)
  timeslots: TimeSlot[] = [
  ];

  constructor() {}

  ngOnInit(): void {
    // Nếu có service, có thể gọi ở đây để fetch data
  }

  // Các hàm xử lý (Xem, Chỉnh sửa, Xóa, Thêm)
  onViewTimeSlot(timeslot: TimeSlot): void {
    console.log('Xem thông tin ca làm việc', timeslot);
  }

  onEditTimeSlot(timeslot: TimeSlot): void {
    console.log('Chỉnh sửa ca làm việc', timeslot);
  }

  onDeleteTimeSlot(timeslotId: number): void {
    console.log('Xóa ca làm việc', timeslotId);
  }

  onAddTimeSlot(): void {
    console.log('Thêm mới ca làm việc');
  }
}
