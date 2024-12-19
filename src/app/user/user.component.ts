import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserService } from '../service/user.service'; // Đảm bảo đường dẫn chính xác

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule, CommonModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']  // Sửa lại 'styleUrls' thay vì 'styleUrl'
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  newUser: User = {
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
  isEditMode: boolean = false;
  searchQuery: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  addUser() {
    this.userService.createUser(this.newUser).subscribe((user: User) => {
      this.users.push(user);
      this.newUser = { id: 0, password: '', email: '', userName: '', address: '', gender: true, phoneNumber: '', image: '', createdAt: new Date(), updatedAt: new Date(), role: { id: 0, roleName: '' } };
    });
  }

  updateUser() {
    if (this.newUser.id) {
      this.userService.updateUser(this.newUser.id, this.newUser).subscribe((user: User) => {
        const index = this.users.findIndex(u => u.id === user.id); //Tìm vị trí id = user.id trong mảng this.users
        if (index !== -1) {
          this.users[index] = user; // Cập nhật thông tin người dùng tại vị trí index trong mảng this.users
        }
        this.isEditMode = false;
        this.newUser = { id: 0, password: '', email: '', userName: '', address: '', gender: true, phoneNumber: '', image: '', createdAt: new Date(), updatedAt: new Date(), role: { id: 0, roleName: '' } };
      });
    }
  }

  editUser(user: User) {
    this.isEditMode = true;
    this.newUser = { ...user };  // Sao chép thông tin người dùng vào form
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }
 /*  searchUsers() {
    if (this.searchQuery) {
      this.users = this.users.filter(user =>
        user.userName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.loadUsers();  // Reload tất cả người dùng nếu không tìm kiếm
    }
  } */
  searchUserById() {
    const userId = Number(this.searchQuery);  // Chuyển đổi searchQuery thành kiểu số
    if (isNaN(userId)) {  // Kiểm tra nếu giá trị không phải là một số hợp lệ
      alert('Vui lòng nhập một ID hợp lệ!');
      return;
    }
    
    this.userService.getUserById(userId).subscribe(user => {
      if (user) {
        this.newUser = user;  // Gán thông tin người dùng tìm được vào biến newUser
        this.isEditMode = true; // Chuyển sang chế độ chỉnh sửa
      } else {
        alert('Không tìm thấy người dùng!');
      }
    }, error => {
      console.error('Có lỗi khi tìm kiếm người dùng:', error);
    });
  }
}
