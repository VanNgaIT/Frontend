import { Component, OnInit } from '@angular/core';
import { TimeSlot } from '../model/timeslot.model';
import { Schedule } from '../model/schedule.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarAdminComponent } from '../sidebar-admin/sidebar-admin.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { TimeSlotService } from '../service/timeslot.service';
import { DoctorService } from '../service/doctor.service';
import { Doctor } from '../model/doctor.model';
import { ScheduleService } from '../service/schedule.service';

@Component({
  selector: 'app-time-slot',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarAdminComponent, HeaderComponent, FooterComponent],
  templateUrl: './time-slot.component.html',
  styleUrls: ['./time-slot.component.scss']
})
export class TimeSlotComponent implements OnInit {
  // Mảng lưu danh sách các bác sĩ (Dữ liệu sẽ lấy từ service)
  doctors: Doctor[] = [];  // Danh sách bác sĩ
  selectedDoctorId: number | null = null;  // ID bác sĩ đã chọn
  schedules: Schedule[] = [];  // Danh sách lịch trình của bác sĩ đã chọn
  timeSlots: TimeSlot[] = [];  // Danh sách thời gian của lịch trình đã chọn
  newTimeSlot: TimeSlot = {   // Khởi tạo với doctorId là null
    id: 0,
    startTime: '',
    endTime: '',
    doctorId: 0,
    doctorName: '',
    scheduleId: null,
    scheduleDate: new Date(),
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };  // Thông tin timeSlot mới

  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number = 5; // Số hàng trên mỗi trang
  paginatedTimeSlots: TimeSlot[] = []; // Danh sách timeSlots đã phân trang

  constructor(
    private timeSlotService: TimeSlotService,
    private doctorService: DoctorService,
    private scheduleService: ScheduleService,
  ) {};


  ngOnInit(): void {
    // Lấy danh sách bác sĩ khi component khởi tạo
    this.doctorService.getAllDoctors().subscribe(doctors => {
      this.doctors = doctors;
      // Gán doctorId là id của bác sĩ đầu tiên (nếu có bác sĩ)
      if (this.doctors.length > 0) {
        this.newTimeSlot.doctorId = this.doctors[0].id;  // Chỉ gán id, không phải đối tượng
      }
    });
    this.loadUsers();
  }

  loadUsers() {
      this.timeSlotService.getAllTimeSlots().subscribe((data: TimeSlot[]) => {
        this.timeSlots = data;
        this.updatePaginatedTimeSlots();
      });
    }
  // Khi chọn bác sĩ, lấy lịch trình của bác sĩ đó
  onDoctorSelect(): void {
    const doctorId = this.newTimeSlot.doctorId;
    console.log('Selected doctorId:', doctorId);
    if (doctorId) {
      // Cập nhật doctorId trong newTimeSlot khi chọn bác sĩ
      this.scheduleService.getSchedulesByDoctorId(doctorId).subscribe(schedules => {
        this.schedules = schedules;  // Cập nhật danh sách lịch trình
        this.timeSlots = [];         // Xóa danh sách ca làm việc trước đó
      });
    } else {
      console.error('DoctorId is null or undefined');
    }
  }

  updatePaginatedTimeSlots(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTimeSlots = this.timeSlots.slice(startIndex, endIndex);
  }

  // Khi chọn lịch trình, lấy timeSlots của lịch trình đó
  onScheduleSelect(scheduleId: number): void {
    this.scheduleService.getTimeSlotsByScheduleId(scheduleId).subscribe(timeSlots => {
      this.timeSlots = timeSlots;
    });
  }

  // Tạo mới timeSlot
  createTimeSlot(): void {
    const startTimeString = this.newTimeSlot.startTime;
    const endTimeString = this.newTimeSlot.endTime;
  
    if (startTimeString && /^[0-9]{2}:[0-9]{2}$/.test(startTimeString) && /^[0-9]{2}:[0-9]{2}$/.test(endTimeString)) {
      const [startHour, startMinute] = startTimeString.split(':').map(num => parseInt(num));
      const [endHour, endMinute] = endTimeString.split(':').map(num => parseInt(num));
      const startTime = new Date();
      startTime.setHours(startHour, startMinute, 0, 0);
      const endTime = new Date();
      endTime.setHours(endHour, endMinute, 0, 0);
      this.newTimeSlot.startTime = startTime.toISOString().slice(11, 19);
      this.newTimeSlot.endTime = endTime.toISOString().slice(11, 19);
  
      if (this.selectedDoctorId !== null) {
        const selectedDoctor = this.doctors.find((doctor) => doctor.id === this.selectedDoctorId);
  
        if (selectedDoctor) {
          this.newTimeSlot.doctorId = selectedDoctor.id;
  
          if (this.newTimeSlot.scheduleId !== null) {
            this.newTimeSlot.scheduleId = Number(this.newTimeSlot.scheduleId);
            // Gọi API để tạo timeSlot
            this.timeSlotService.createTimeSlots(this.newTimeSlot).subscribe(
              (createdTimeSlot) => {
                this.timeSlots.push(createdTimeSlot);
                this.updatePaginatedTimeSlots(); // Cập nhật danh sách đã phân trang
                this.newTimeSlot = {
                  id: 0,
                  startTime: '',
                  endTime: '',
                  doctorId: 0,
                  doctorName: '',
                  scheduleId: null,
                  scheduleDate: new Date(),
                  isAvailable: true,
                  createdAt: new Date(),
                  updatedAt: new Date()
                };
              },
              (error) => {
                console.error('Lỗi khi tạo timeSlot:', error);
              }
            );
          } else {
            console.error('Chưa chọn lịch trình.');
          }
        } else {
          console.error('Không tìm thấy bác sĩ với ID đã chọn.');
        }
      } else {
        console.error('Chưa chọn bác sĩ.');
      }
    }
    this.loadUsers();
  }
  
  
  getDoctorName(doctorId: number): string {
    const doctor = this.doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Chưa có bác sĩ';  // Trả về tên bác sĩ hoặc thông báo nếu không tìm thấy
  }
 
  
  // Cập nhật timeSlot
  editableTimeSlot: TimeSlot | null = null; // Biến để lưu thông tin timeSlot đang chỉnh sửa

editTimeSlot(id: number): void {
  const timeSlot = this.timeSlots.find(ts => ts.id === id);
  if (timeSlot) {
    this.editableTimeSlot = { ...timeSlot }; // Tạo một bản sao để chỉnh sửa
  } else {
    console.error('Không tìm thấy timeSlot với ID:', id);
  }
}


saveUpdatedTimeSlot(): void {
  if (this.editableTimeSlot) {
    const id = this.editableTimeSlot.id!;
    this.timeSlotService.updateTimeSlots(id, this.editableTimeSlot).subscribe(
      (updated) => {
        const index = this.timeSlots.findIndex(ts => ts.id === id);
        if (index !== -1) {
          this.timeSlots[index] = updated; // Cập nhật danh sách timeSlots
        }
        this.editableTimeSlot = null; // Đóng form
      },
      (error) => {
        console.error('Lỗi khi cập nhật timeSlot:', error);
      }
    );
  }
}

  // Xóa timeSlot
  deleteTimeSlot(id: number): void {
    this.timeSlotService.deleteTimeSlots(id).subscribe(
      () => {
        this.timeSlots = this.timeSlots.filter(ts => ts.id !== id);
      },
      (error) => {
        console.error('Lỗi khi xóa timeSlot:', error);
      }
    );
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTimeSlots();
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePaginatedTimeSlots();
    }
  }
  
  totalPages(): number {
    return Math.ceil(this.timeSlots.length / this.itemsPerPage);
  }
}
