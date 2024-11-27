import { User } from './user.model';
import { Doctor } from './doctor.model';

export interface Histories {
  id: number;                // ID của lịch sử khám bệnh
  patientId: User;           // Thông tin bệnh nhân
  doctor: Doctor;        // Thông tin bác sĩ
  description: string;       // Mô tả lịch sử khám bệnh
  files: string;             // Các file liên quan đến lịch sử khám bệnh
  createdAt: Date;           // Thời gian tạo
  updatedAt: Date;           // Thời gian cập nhật
}
