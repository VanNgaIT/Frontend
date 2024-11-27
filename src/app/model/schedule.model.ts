import { Doctor } from './doctor.model';
import { TimeSlot } from './timeslot.model';

export interface Schedule {
  id: number;                 
  currentNumber: number;      // Số lượng hiện tại
  maxNumber: number;          // Số lượng tối đa
  date: Date;                 // Ngày của lịch trình
  timeType: string;           // Loại thời gian
  doctor: Doctor;             // Thông tin bác sĩ liên quan
  timeSlots: TimeSlot[];      // Danh sách khung giờ
  createdAt: Date;            // Thời gian tạo
  updatedAt: Date;            // Thời gian cập nhật
}
