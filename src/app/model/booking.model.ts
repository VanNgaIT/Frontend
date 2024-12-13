import { Doctor } from './doctor.model';
import { User } from './user.model';
import { TimeSlot } from './timeslot.model';

export interface Booking {
  id: number;
  statusId: string;        // Trạng thái của booking
  doctor: Doctor;          // Thông tin bác sĩ
  user: User;           // Thông tin bệnh nhân          // Email liên hệ
  cancelReason: string;    // Lý do hủy (nếu có)
  date: Date;              // Ngày đặt        // Loại thời gian
  timeSlot: TimeSlot;      // Khung giờ
  createdAt: Date;         // Ngày tạo
  updatedAt: Date;         // Ngày cập nhật
}
