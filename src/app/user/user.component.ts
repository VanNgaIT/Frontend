import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent{
  users: User[] = [];
  newUser: User = { id: 0,password: '', fullName: '', email: '', phoneNumber: '', gender: true, address: '', createdAt: new Date(), updatedAt: new Date(), image: '', role: { id: 'CUST', roleName: 'patient' }};
  isEditMode: boolean = false;

  constructor(private authService: AuthService) {}

  // Thêm bác sĩ
  addUser() {
    // Gán ID cho bác sĩ mới (tạo ngẫu nhiên hoặc từ database)
    this.newUser.id = Math.floor(Math.random() * 10000);
    this.users.push(this.newUser);

    this.authService.registerUser(this.newUser.email, 'defaultPassword').subscribe(response => {

    });

    // Reset form
    this.newUser = { id: 0, password: '', fullName: '', email: '', phoneNumber: '', gender: true, address: '', createdAt: new Date(), updatedAt: new Date(), image: '', role: { id: 'CUST', roleName: 'patient' }};
  }

  // Chỉnh sửa bác sĩ
  editUser(user: User) {
    this.newUser = { ...user };
    this.isEditMode = true;
  }

  // Lưu thay đổi sau khi chỉnh sửa
  updateUser() {
    const index = this.users.findIndex(d => d.id === this.newUser.id);
    if (index !== -1) 
      this.users[index] = { ...this.newUser };
      this.isEditMode = false;
      this.newUser = { id: 0, password: '', fullName: '', email: '', phoneNumber: '', gender: true, address: '', createdAt: new Date(), updatedAt: new Date(), image: '', role: { id: 'CUST', roleName: 'patient' }};
    }
  

  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }
}

