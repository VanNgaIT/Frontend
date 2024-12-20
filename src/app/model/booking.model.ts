
export interface Booking {
  id: number;
  statusId: string;        // Trạng thái của booking
  doctorId: number;          // Thông tin bác sĩ
  doctorName: string;
  userId: number;           // Thông tin bệnh nhân          // Email liên hệ
  userName: string;
  cancelReason: string;    // Lý do hủy (nếu có)
  date: Date;              // Ngày đặt        // Loại thời gian
  timeSlotId: number;      // Khung giờ
  startTime: string;  
  endTime: string;
  createdAt: Date;         // Ngày tạo
  updatedAt: Date;         // Ngày cập nhật
}
