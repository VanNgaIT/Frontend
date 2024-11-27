import { Component } from '@angular/core';
import { Doctor } from '../model/doctor.model';
import { AuthService } from '../service/auth.service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent {
  doctors: Doctor[] = [];
  newDoctor: Doctor = { id: 0, fullName: '', email: '', phoneNumber: '', gender: true, profilePicture: '', createdAt: new Date(), updatedAt: new Date(), specialty: { id: 1, name: 'Dentistry', description: '', image: '', createdAt: new Date(), updatedAt: new Date()}};
  isEditMode: boolean = false;

  constructor(private authService: AuthService) {}

  // Thêm bác sĩ
  addDoctor() { 
    // Gán ID cho bác sĩ mới (tạo ngẫu nhiên hoặc từ database)
    this.newDoctor.id = Math.floor(Math.random() * 10000);
    this.doctors.push(this.newDoctor);

    // Tạo user với role doctor
    this.authService.registerUser(this.newDoctor.email, 'defaultPassword', 'defaultPassword').subscribe(response => {
      // Sau khi tạo user thành công, cập nhật role thành doctor
      // Gọi API để thêm user vào database với role là 'doctor'
    });

    // Reset form
    this.newDoctor = {id: 0, fullName: '', email: '', phoneNumber: '', gender: true, profilePicture: '', createdAt: new Date(), updatedAt: new Date(), specialty: { id: 1, name: 'Dentistry', description: '', image: '', createdAt: new Date(), updatedAt: new Date()}};
  }

  // Chỉnh sửa bác sĩ
  editDoctor(doctor: Doctor) {
    this.newDoctor = { ...doctor };
    this.isEditMode = true;
  }

  // Lưu thay đổi sau khi chỉnh sửa
  updateDoctor() {
    const index = this.doctors.findIndex(d => d.id === this.newDoctor.id);
    if (index !== -1) {
      this.doctors[index] = { ...this.newDoctor };
      this.isEditMode = false;
      this.newDoctor = {id: 0, fullName: '', email: '', phoneNumber: '', gender: true, profilePicture: '', createdAt: new Date(), updatedAt: new Date(), specialty: { id: 1, name: 'Dentistry', description: '', image: '', createdAt: new Date(), updatedAt: new Date()}};
    }
  }

  // Xóa bác sĩ
  deleteDoctor(id: number) {
    this.doctors = this.doctors.filter(doctor => doctor.id !== id);
  }
}
