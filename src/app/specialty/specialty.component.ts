import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Specialty } from '../model/specialty.model';

@Component({
  selector: 'app-specialty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent implements OnInit {
  specialties: Specialty[] = [
  ];

  constructor() {}

  ngOnInit(): void {
    // Nếu có service, có thể gọi ở đây để fetch data
  }

  // Thêm hàm xử lý các hành động cần thiết (Ví dụ: xem, chỉnh sửa, xóa)
  onViewSpecialty(specialty: Specialty): void {
    // Logic để xem chi tiết chuyên khoa
    console.log(specialty);
  }
  onAddSpecialty(): void {
    // Logic để thêm mới chuyên khoa (có thể mở modal hoặc chuyển hướng đến trang thêm)
    console.log('Thêm mới chuyên khoa');
  }

  onEditSpecialty(specialty: Specialty): void {
    // Logic để chỉnh sửa chuyên khoa
    console.log('Chỉnh sửa chuyên khoa', specialty);
  }

  onDeleteSpecialty(specialtyId: number): void {
    // Logic để xóa chuyên khoa
    console.log('Xóa chuyên khoa', specialtyId);
  }
}
