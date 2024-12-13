import { Booking } from "./booking.model";
import { Doctor } from "./doctor.model";
import { TimeSlot } from "./timeslot.model";
import { User } from "./user.model";

export interface BookingDetails {
    booking: Booking; // Thông tin về lịch hẹn
    doctor: Doctor;   // Thông tin bác sĩ
    timeSlot: TimeSlot; // Thông tin thời gian
    patient: User;    // Thông tin bệnh nhân (user)
  }