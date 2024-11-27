import { Doctor } from './doctor.model';
import { Schedule } from './schedule.model';

export interface TimeSlot {
  id: number;              // ID của TimeSlot
  doctorId: Doctor;          // Thông tin bác sĩ liên quan
  schedule: Schedule;      // Lịch trình liên quan
  startTime: string;       // Giờ bắt đầu (định dạng 'HH:mm:ss')
  endTime: string;         // Giờ kết thúc (định dạng 'HH:mm:ss')
  isAvailable: boolean;    // Tình trạng khả dụng
  createdAt: Date;         // Thời gian tạo
  updatedAt: Date;         // Thời gian cập nhật
}
