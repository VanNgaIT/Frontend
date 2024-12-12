// user.model.ts
import { Role } from './role.model';  // Import Role từ file khác

export interface User {
  id: number;
  password: string;
  email: string;
  userName: string;
  address: string;  
  gender: boolean;
  phoneNumber: string;
  image: string;
  createdAt: Date;  // Ngày tạo
  updatedAt: Date;  // Ngày cập nhật
  role: Role;  // Mối quan hệ với Role
}
