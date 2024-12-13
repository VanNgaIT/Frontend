import { Component } from '@angular/core';
import { Doctor } from '../model/doctor.model';
import { AuthService } from '../service/auth.service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from '../footer/footer.component';
import { DoctorService } from '../service/doctor.service'; // import service để lấy dữ liệu bác sĩ
import { SpecialtyService } from '../service/specialty.service';
import { Specialty } from '../model/specialty.model';
@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
  doctors: Doctor[] = [];
  specialties: Specialty[] = [];
  selectedDoctor: Doctor | null = null;
  newDoctor: Doctor = {
    id: 0,
    clinicId: 1,
    roleId: 2,
    name: '',
    email: '',
    phoneNumber: '',
    gender: true, // mặc định Nam
    profilePicture: '',
    specialtyId: 0, // Dành cho việc chọn chuyên khoa khi thêm bác sĩ mới
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  isEditMode: boolean = false;

  constructor(private doctorService: DoctorService, private specialtyService: SpecialtyService) {}

  ngOnInit() {
    this.loadDoctors();
    this.loadSpecialties();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe((doctors) => {
      this.doctors = doctors;
    });
  }

  loadSpecialties() {
    this.specialtyService.getAllSpecialty().subscribe((specialties) => {
      this.specialties = specialties;
    });
  }

  // Khi người dùng chọn bác sĩ, hiển thị chuyên khoa của bác sĩ đó
  selectDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
    // Gán specialtyId cho bác sĩ theo id của chuyên khoa
    const specialty = this.specialties.find(s => s.id === doctor.specialtyId);
    if (specialty) {
      doctor.specialtyId = specialty.id;  // Gán ID của chuyên khoa vào specialtyId của bác sĩ
    }
  }

  // Thêm bác sĩ mới
  addDoctor() {
    this.doctorService.createDoctors(this.newDoctor).subscribe((newDoctor) => {
      this.doctors.push(newDoctor);
      this.resetForm();
    });
  }

  editDoctor(doctor: Doctor) {
    // Set the `newDoctor` object with the selected doctor data for editing
    this.newDoctor = { ...doctor };
    this.isEditMode = true; // Set edit mode flag to true
  }
  // Cập nhật bác sĩ
  updateDoctor() {
    if (this.newDoctor) {  // Kiểm tra nếu newDoctor đã được chọn
      this.doctorService.updateDoctors(this.newDoctor.id, this.newDoctor).subscribe(() => {
        this.loadDoctors(); // Tải lại danh sách bác sĩ sau khi cập nhật
        this.resetForm();
        this.isEditMode = false;  // Đặt lại chế độ chỉnh sửa về false sau khi cập nhật
      });
    }
  }
  

  // Xóa bác sĩ
  deleteDoctor(id: number) {
    this.doctorService.deleteDoctors(id).subscribe(() => {
      this.loadDoctors();
    });
  }

  // Reset form sau khi thêm mới hoặc cập nhật
  resetForm() {
    this.newDoctor = {
      id: 0,
      clinicId: 1,
      roleId: 2,
      name: '',
      email: '',
      phoneNumber: '',
      gender: true,
      profilePicture: '',
      specialtyId: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.isEditMode = false;
  }

  getSpecialtyName(specialtyId: number): string {
    const specialty = this.specialties.find(s => s.id === specialtyId);
    return specialty ? specialty.name : 'Không xác định';
  }
}
