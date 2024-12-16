import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
   isEditing: boolean = false;  
   user: User = {   // Biến `user` để dùng trên HTML
    id: 0,
    password: '',
    email: '',
    userName: '',
    address: '',
    gender: true,
    phoneNumber: '',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    role: { id: 0, roleName: '' }
  };

   constructor(private userService: UserService) {}

   ngOnInit(): void {
     this.loadUser();
   }

   
   loadUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token); // Giải mã token
      const userId = decodedToken.sub;  // Lấy sub ID từ token
      console.log('User ID:', userId);  // In ra kiểm tra
  
      this.userService.getUserById(userId).subscribe((data: User) => {
        this.user = data;
      });
    }
  }

  

  toggleEdit() {
    this.isEditing = true;
  }

  save() {
    if (this.user.id) {
      this.userService.updateUser(this.user.id, this.user).subscribe((updatedUser: User) => {
        this.user = updatedUser;  // Cập nhật lại `user` từ server
        this.isEditing = false;
      });
    }
  }

  cancel() {
    this.isEditing = false;
    this.loadUser();  // Reload dữ liệu
  }
}
