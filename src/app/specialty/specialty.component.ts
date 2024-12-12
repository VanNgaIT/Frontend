import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Specialty } from '../model/specialty.model';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { SpecialtyService } from '../service/specialty.service'; 

@Component({
  selector: 'app-specialty',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.scss'
})
export class SpecialtyComponent implements OnInit {
  specialties: Specialty[] = []; // Danh sách chuyên khoa
  specialty: Specialty = { 
    id: 0,
    name: '',
    description: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    image: '' }; // Thông tin chuyên khoa
  isEditing: boolean = false; // Cờ xác định đang chỉnh sửa hay thêm mới
  currentSpecialtyId?: number; // ID của chuyên khoa đang chỉnh sửa

  constructor(private specialtyService: SpecialtyService) {}

  ngOnInit(): void {
    this.getAllSpecialties(); // Lấy danh sách chuyên khoa khi khởi tạo
  }

  getAllSpecialties(): void {
    this.specialtyService.getAllSpecialty().subscribe(
      (data) => (this.specialties = data),
      (error) => console.error('Error fetching specialties', error)
    );
  }

  onAddSpecialty(): void {
    if (!this.specialty.name || !this.specialty.description) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    this.specialtyService.createSpecialty(this.specialty).subscribe(
      (newSpecialty) => {
        this.specialties.push(newSpecialty);
        this.resetForm();
      },
      (error) => console.error('Error creating specialty', error)
    );
  }

  onEditSpecialty(specialty: Specialty): void {
    this.isEditing = true;
    this.currentSpecialtyId = specialty.id;
    this.specialty = { ...specialty }; // Copy thông tin để chỉnh sửa
  }

  onUpdateSpecialty(): void {
    if (!this.currentSpecialtyId) return;
    this.specialtyService.updateSpecialty(this.currentSpecialtyId, this.specialty).subscribe(
      (updatedSpecialty) => {
        const index = this.specialties.findIndex((s) => s.id === this.currentSpecialtyId);
        if (index !== -1) this.specialties[index] = updatedSpecialty;
        this.resetForm();
      },
      (error) => console.error('Error updating specialty', error)
    );
  }

  onDeleteSpecialty(specialtyId: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa chuyên khoa này?')) {
      this.specialtyService.deleteSpecialty(specialtyId).subscribe(
        () => {
          this.specialties = this.specialties.filter((s) => s.id !== specialtyId);
        },
        (error) => console.error('Error deleting specialty', error)
      );
    }
  }

  resetForm(): void {
    this.specialty = { id: 0, name: '', description: '', image: '', createdAt: new Date(), updatedAt: new Date(), };
    this.isEditing = false;
    this.currentSpecialtyId = undefined;
  }
}
