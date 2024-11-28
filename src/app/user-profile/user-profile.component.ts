import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  isEditing: boolean = false; // Trạng thái chỉnh sửa
  user: User = {} as User // Lưu thông tin người dùng

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUserDetails().subscribe(
      (data: User) => {
        this.user = data; // Lưu dữ liệu vào biến user
      },
      (error) => {
        console.error('Có lỗi khi lấy thông tin người dùng', error);
      }
    );
  }

  toggleEdit() {
    this.isEditing = true;
  }

  save() {
    this.userService.updateUserDetails(this.user).subscribe(
      (updatedUser: User) => {
        this.user = updatedUser; // Cập nhật lại dữ liệu người dùng sau khi lưu
        this.toggleEdit(); // Quay lại chế độ xem
      },
      (error) => {
        console.error('Không thể lưu thông tin', error);
      }
    );
  }

  cancel() {
    this.isEditing = false;
    this.loadUser(); // Tải lại thông tin gốc
  }
}
